import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Button, CellComponent, Column, ErrorSize, InputNumberField, InputTextField, Row, Table, TextField, Title } from '../styles/global'
import { Maze, Cell, Position } from '../lib/maze'
import { useState, useRef } from 'react'
import WinModal from "../components/WinModal/WinModal"

const inter = Inter({ subsets: ['latin'] })

interface GridProps {
  maze: Cell[][];
  player?: Position;
  end?: Position;
}
export default function Home() {
  const [mazeState, setMazeState] = useState<GridProps>({
    maze: [],
    player: { x: 1, y: 1 },
    end: { x: 1, y: 1 }
  });
  const [sizeState, setSizeState] = useState(10);
  const [moveInputState, setMoveInputState] = useState("");
  const [errorSizeState, setErrorSizeState] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const Grid: React.FC = () => {
    const rows = [];
    var currentMaze: Cell[][] = mazeState.maze;
    if (currentMaze) {
      for (let i = 0; i < currentMaze.length; i++) {
        const cols = [];
        for (let j = 0; j < currentMaze[i].length; j++) {
          cols.push(
            <CellComponent key={`${i}-${j}`} color={getCellColor(i, j)} />
          )
        }
        rows.push(
          <Row key={i}>
            {cols}
          </Row>
        );
      }
    }
    return <Table onClick={() => {
      if (ref.current) {
        ref.current.focus();
      }
    }}>
      {rows}
    </Table>;
  };

  function getCellColor(i: number, j: number): string {
    const player = mazeState.player!;
    const end = mazeState.end!;
    const cell = mazeState.maze[i][j];

    if (player.x === end.x && player.y === end.y && i === player.x && j === player.y) {
      return "blue";
    } else if (i === end.x && j === end.y) {
      return "green";
    } else if (i === player.x && j === player.y) {
      return "red";
    } else if (cell.isWall) {
      return cell.active ? "white" : "darkcyan";
    }
    return "white";
  }



  const onGenerateMaze = () => {
    const newMaze = new Maze(sizeState);
    newMaze.Main()

    setMazeState({
      maze: newMaze.maze,
      player: { x: 1, y: 1 },
      end: { x: newMaze.size - 2, y: newMaze.size - 2 }
    });

    if (ref.current) {
      ref.current.focus();
    }
  }

  function setMazeSize(value: number) {
    if (value > 1 && value < 41) {
      setSizeState(value)
      setErrorSizeState(false)
    } else {
      setErrorSizeState(true)
    }
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
    var currentMaze: Cell[][] = mazeState.maze;
    var playerPos: Position = mazeState.player!;
    var endPos: Position = mazeState.end!;

    if ((playerPos.x + x > 0 && playerPos.y + y > 0
      && playerPos.x + x < endPos.x + 2 && playerPos.y + y < endPos.y + 2)
      && !currentMaze[playerPos.x + x][playerPos.y + y].isWall
      || currentMaze[playerPos.x + x][playerPos.y + y].active
      || playerPos.x + x == endPos.x && playerPos.y + y == endPos.y) {

      checkWin({ x: playerPos.x + x, y: playerPos.y + y }, endPos)

      setMazeState({
        maze: currentMaze,
        player: { x: playerPos.x + x, y: playerPos.y + y },
        end: endPos
      });

    }

  }

  function checkWin(player: Position, end: Position) {
    if (player.x === end.x && player.y === end.y) {
      console.log("Finished")
      setShowWinModal(true);
    } else {
      setShowWinModal(false);
    }
  }

  return (
    <>
      <Head>
        <title>LAByrinth - Maze game</title>
        <meta name="description" content="Play a random generated maze game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title>LAByrinth</Title>

      <Row>
        <TextField bold>Maze width/height: </TextField>
        <InputNumberField defaultValue="10" onChange={(event) => { setMazeSize(Number(event.target.value)) }} />
        {errorSizeState && <ErrorSize>Size must be<br /> between 2 and 40</ErrorSize>}
      </Row>

      <Row marginTop='10px'>
        <Button onClick={onGenerateMaze}>Generate maze</Button>
      </Row>

      {showWinModal && <WinModal />}

      <Grid />

      <Row marginTop={"50px"}>
        <TextField size='18px'>Type A/W/S/D or the Arrow keys to walk through the path</TextField>
      </Row>

      <Row>
        <InputTextField ref={ref} onKeyDown={getMoveDirection} value={moveInputState} readOnly />
      </Row>


    </>
  )
}