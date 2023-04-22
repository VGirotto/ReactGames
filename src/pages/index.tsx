import Head from "next/head";
import { Inter } from "next/font/google";
import {
  Button,
  CellComponent,
  Column,
  ErrorSize,
  Frame,
  InputNumberField,
  InputTextField,
  MazeRow,
  Row,
  Table,
  TextField,
  Timer,
  Title,
} from "../styles/global";
import { Maze, Cell, Position } from "../lib/maze";
import { DepthSearchMaze } from "../lib/mazeDepthSearch";
import React, { useState, useRef, useEffect } from "react";
import WinModal from "../components/WinModal/WinModal";
import { msToMinutes } from "@/utils/formatter";

const inter = Inter({ subsets: ["latin"] });

interface GridProps {
  maze: Cell[][];
  player?: Position;
  end?: Position;
}

interface RightPathI {
  path: Position[];
}

export default function Home() {
  const [mazeState, setMazeState] = useState<GridProps>({
    maze: [],
    player: { x: 1, y: 1 },
    end: { x: 1, y: 1 },
  });
  const [sizeState, setSizeState] = useState(21);
  const [actualSize, setActualSizeSize] = useState(21);
  const [moveInputState, setMoveInputState] = useState("");
  const [errorSizeState, setErrorSizeState] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [timerState, setTimerState] = useState(0);
  const [rightPath, setRightPath] = useState<RightPathI>({ path: [] })

  const ref = useRef<HTMLInputElement>(null);

  const Grid: React.FC = () => {
    const rows = [];
    const currentMaze: Cell[][] = mazeState.maze;
    if (currentMaze) {
      for (let i = 0; i < currentMaze.length; i++) {
        const cols = [];
        for (let j = 0; j < currentMaze[i].length; j++) {
          cols.push(
            <CellComponent key={`${i}-${j}`} color={getCellColor(i, j)} />
          );
        }
        rows.push(
          <MazeRow size={actualSize} key={i}>
            {cols}
          </MazeRow>
        );
      }
    }
    return (
      <Frame>
        <Table
          onClick={() => {
            if (ref.current) {
              ref.current.focus();
            }
          }}
        >
          {rows}
        </Table>
      </Frame>
    );
  };

  function getCellColor(i: number, j: number): string {
    const player = mazeState.player!;
    const end = mazeState.end!;
    const cell = mazeState.maze[i][j];


    if (
      player.x === end.x &&
      player.y === end.y &&
      i === player.x &&
      j === player.y
    ) {
      return "blue";
    } else if (i === end.x && j === end.y) {
      return "green";
    } else if (i === player.x && j === player.y) {
      return "red";
    } else if (rightPath.path.some(pos => pos.x == i && pos.y == j)) {
      return "blue";
    } else if (cell.isWall) {
      return cell.isActive ? "white" : "darkcyan";
    }
    return "white";
  }

  const onGenerateMaze = (createNew: Boolean) => {
    if (sizeState % 2 == 0) {
      setErrorSizeState(true);
      return;
    }
    setActualSizeSize(sizeState);
    if (createNew) {
      const newMaze = new Maze(sizeState);
      newMaze.Main();

      setMazeState({
        maze: newMaze.maze,
        player: { x: 1, y: 1 },
        end: { x: newMaze.size - 2, y: newMaze.size - 2 },
      });
    } else {
      setMazeState({
        maze: mazeState.maze,
        player: { x: 1, y: 1 },
        end: mazeState.end,
      });
    }


    if (ref.current) {
      ref.current.focus();
    }

    setRightPath({ path: [] })
    setShowWinModal(false);
    setTimerState(0);
  };

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
    const mazeSolver = new DepthSearchMaze(mazeState.maze);

    setRightPath({
      path: mazeSolver.findRightPath()
    })
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (showWinModal) return;
      setTimerState(timerState + 1000);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerState]);

  useEffect(() => {
    onGenerateMaze(true)
  }, [])

  return (
    <>
      <Head>
        <title>React Maze game</title>
        <meta name="description" content="Play a random generated maze game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/labyrinth.png" />
      </Head>

      <Title>React Maze</Title>

      <Column>
        <Row>
          <TextField bold>Maze width/height: </TextField>
          <InputNumberField
            defaultValue="21"
            onChange={(event) => {
              setMazeSize(Number(event.target.value));
            }}
          />
          {errorSizeState ? (
            sizeState % 2 ? (
              <ErrorSize>
                Size must be
                <br /> between 5 and 81
              </ErrorSize>
            ) : (
              <ErrorSize>
                Size must be
                <br /> an odd number
              </ErrorSize>
            )
          ) : (
            <></>
          )}
        </Row>

        <Row marginTop="5px">
          <Button onClick={() => onGenerateMaze(true)} bold>Generate maze</Button>
        </Row>

        {showWinModal && <WinModal size={sizeState} time={timerState} />}

        <Row marginTop={"20px"}>
          <Timer>Timer: {msToMinutes(timerState)}</Timer>

        </Row>
        <Grid />

        <Row marginTop="20px" justify="space-between">
          <Button width="180px" size="12px" bgcolor="lightblue" onClick={() => onGenerateMaze(false)}>Reset same maze</Button>
          <Button width="180px" size="12px" bgcolor="#ff9494" onClick={getRightPath}>Show right path</Button>
        </Row>

        <Row marginTop={"20px"}>
          <TextField size="18px">
            Type A/W/S/D or the Arrow keys to walk through the path
          </TextField>
        </Row>

        <Row>
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
