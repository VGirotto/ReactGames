import Head from "next/head";
import { Inter } from "next/font/google";
import {
  Button,
  Column,
  ErrorContainer,
  ErrorSize,
  InputNumberField,
  InputTextField,
  Row,
  TextField,
  Timer,
  Title,
} from "../styles/global";
import { Maze, Cell, Position } from "../lib/maze";
import { DepthSearchMaze } from "../lib/mazeDepthSearch";
import React, { useState, useRef, useEffect } from "react";
import WinModal from "../components/WinModal/winModal";
import { msToMinutes } from "@/utils/formatter";
import { Grid } from "@/components/Grid/grid";
import AnimatedText from "@/components/AnimatedTexts/AnimatedText";

const inter = Inter({ subsets: ["latin"] });

export interface MazeProps {
  maze: Cell[][];
  player?: Position;
  end?: Position;
}

interface RightPathI {
  path: Position[];
}

export default function Home() {
  const [mazeState, setMazeState] = useState<MazeProps>({
    maze: [],
    player: { x: 1, y: 1 },
    end: { x: 1, y: 1 },
  });
  const [sizeState, setSizeState] = useState(21);
  const [actualSize, setActualSize] = useState(21);
  const [moveInputState, setMoveInputState] = useState("");
  const [errorSizeState, setErrorSizeState] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [timerState, setTimerState] = useState(0);
  const [rightPath, setRightPath] = useState<RightPathI>({ path: [] });
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });
  const [labelText, setLabelText] = useState("");

  const ref = useRef<HTMLInputElement>(null);

  const onGenerateMaze = (createNew: Boolean) => {
    if (createNew) {
      if (sizeState % 2 == 0) {
        setErrorSizeState(true);
        return;
      }
      setActualSize(sizeState);

      const newMaze = new Maze(sizeState);
      newMaze.Main();

      let mazeProps: MazeProps = InitStartAndEndPositions(newMaze.maze);

      setMazeState({
        maze: newMaze.maze,
        player: mazeProps.player,
        end: mazeProps.end,
      });
      setLabelText(`${sizeState}x${sizeState} Maze`);
    } else {
      setMazeState({
        maze: mazeState.maze,
        player: startPosition,
        end: mazeState.end,
      });
      setLabelText(`Restarted ${actualSize}x${actualSize}`);
    }

    if (ref.current) {
      ref.current.focus();
    }

    setRightPath({ path: [] });
    setShowWinModal(false);
    setTimerState(0);
  };

  function InitStartAndEndPositions(maze: Cell[][]): MazeProps {
    let start: Position = { x: 0, y: 0 };
    let end: Position = { x: 0, y: 0 };

    let possibles: number[] = [];

    for (let i = 1; i < sizeState - 1; i++) {
      possibles.push(i);
    }

    let possibleExtremes: number[] = [1, sizeState - 2];

    do {
      start.x = possibles[Math.floor(Math.random() * possibles.length)];

      if (possibleExtremes.includes(start.x)) {
        start.y = possibles[Math.floor(Math.random() * possibles.length)];
      } else {
        start.y =
          possibleExtremes[Math.floor(Math.random() * possibleExtremes.length)];
      }
    } while (!maze[start.x][start.y].isActive);

    let minDistance: number = Math.floor(sizeState / 2) - 2;

    do {
      do {
        end.x = possibles[Math.floor(Math.random() * possibles.length)];
      } while (end.x < start.x + minDistance && end.x > start.x - minDistance);

      if (possibleExtremes.includes(end.x)) {
        do {
          end.y = possibles[Math.floor(Math.random() * possibles.length)];
        } while (
          end.y < start.y + minDistance &&
          end.y > start.y - minDistance
        );
      } else {
        let pe: number[] = possibleExtremes.filter((value) => {
          return value != start.y;
        });
        end.y = pe[Math.floor(Math.random() * pe.length)];
      }
    } while (!maze[end.x][end.y].isActive);

    setStartPosition({ x: start.x, y: start.y });

    return {
      maze: maze,
      player: start,
      end: end,
    };
  }

  function setMazeSize(value: number) {
    if (value > 4 && value < 82) {
      setSizeState(value);
      setErrorSizeState(false);
      return;
    }
    setErrorSizeState(true);
  }

  function getMoveDirection(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "a" || event.key === "ArrowLeft") {
      setMoveInputState(event.key);
      move(0, -1);
    } else if (event.key === "w" || event.key === "ArrowUp") {
      setMoveInputState(event.key);
      move(-1, 0);
    } else if (event.key === "s" || event.key === "ArrowDown") {
      setMoveInputState(event.key);
      move(1, 0);
    } else if (event.key === "d" || event.key === "ArrowRight") {
      setMoveInputState(event.key);
      move(0, 1);
    }
  }

  function move(x: number, y: number) {
    const currentMaze: Cell[][] = mazeState.maze;
    const playerPos: Position = mazeState.player!;
    const endPos: Position = mazeState.end!;

    if (
      (playerPos.x + x > 0 &&
        playerPos.y + y > 0 &&
        playerPos.x + x < endPos.x + 2 &&
        playerPos.y + y < endPos.y + 2 &&
        !currentMaze[playerPos.x + x][playerPos.y + y].isWall) ||
      currentMaze[playerPos.x + x][playerPos.y + y].isActive ||
      (playerPos.x + x == endPos.x && playerPos.y + y == endPos.y)
    ) {
      checkWin({ x: playerPos.x + x, y: playerPos.y + y }, endPos);

      setMazeState({
        maze: currentMaze,
        player: { x: playerPos.x + x, y: playerPos.y + y },
        end: endPos,
      });
    }
  }

  function checkWin(player: Position, end: Position) {
    if (player.x === end.x && player.y === end.y) {
      setShowWinModal(true);
    } else {
      setShowWinModal(false);
    }
  }

  function getRightPath() {
    const mazeSolver = new DepthSearchMaze(
      mazeState.maze,
      startPosition,
      mazeState.end!
    );

    setRightPath({
      path: mazeSolver.findRightPath(),
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (showWinModal) return;
      setTimerState(timerState + 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerState]);

  useEffect(() => {
    onGenerateMaze(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (labelText != "") {
        setLabelText("");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [labelText]);

  return (
    <>
      <Head>
        <title>React Maze game</title>
        <meta name="description" content="Play a random generated maze game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/labyrinth.png" />
      </Head>

      <Column>
        <Title>React Maze</Title>

        <Row>
          <TextField bold>Maze width/height: </TextField>
          <InputNumberField
            defaultValue="21"
            onChange={(event) => {
              setMazeSize(Number(event.target.value));
            }}
          />
        </Row>

        <ErrorContainer>
          {errorSizeState ? (
            sizeState % 2 ? (
              <ErrorSize>Size must be between 5 and 81</ErrorSize>
            ) : (
              <ErrorSize>Size must be an odd number</ErrorSize>
            )
          ) : (
            <></>
          )}
        </ErrorContainer>

        <Row marginTop="15px">
          <Button onClick={() => onGenerateMaze(true)} bold>
            Generate maze
          </Button>
        </Row>

        {showWinModal && <WinModal size={sizeState} time={timerState} />}

        <AnimatedText text={labelText} active={labelText != ""} />

        <Row marginTop={"20px"}>
          <Timer>Timer: {msToMinutes(timerState)}</Timer>
        </Row>

        <Grid
          mazeInfo={mazeState}
          mazeSize={actualSize}
          onClick={() => {
            if (ref.current) {
              ref.current.focus();
            }
          }}
          rightPath={rightPath.path}
        />

        <Row marginTop="20px" justify="space-between">
          <Button
            width="180px"
            size="12px"
            bgcolor="lightblue"
            onClick={() => onGenerateMaze(false)}
          >
            Reset same maze
          </Button>
          <Button
            width="180px"
            size="12px"
            bgcolor="#ff9494"
            onClick={getRightPath}
          >
            Show right path
          </Button>
        </Row>

        <Row marginTop={"30px"}>
          <TextField size="18px">
            Type A/W/S/D or the Arrow keys to walk through the path
          </TextField>
        </Row>

        <Row marginTop={"15px"}>
          <InputTextField
            ref={ref}
            onKeyDown={getMoveDirection}
            value={moveInputState}
            readOnly
          />
        </Row>
      </Column>
    </>
  );
}
