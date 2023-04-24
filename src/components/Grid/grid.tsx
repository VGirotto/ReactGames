import React from "react";
import { Cell, Position } from "@/lib/maze";
import { CellComponent, Frame, MazeRow, Table } from "./styles";
import { MazeProps } from "@/pages/index";

interface GridProps {
  mazeInfo: MazeProps;
  mazeSize: number;
  onClick: () => void;
  rightPath: Position[];
}

export const Grid: React.FC<GridProps> = (props: GridProps) => {
  const rows = [];
  const currentMaze: Cell[][] = props.mazeInfo.maze;
  if (currentMaze) {
    for (let i = 0; i < currentMaze.length; i++) {
      const cols = [];
      for (let j = 0; j < currentMaze[i].length; j++) {
        cols.push(
          <CellComponent key={`${i}-${j}`} color={getCellColor(i, j)} />
        );
      }
      rows.push(
        <MazeRow size={props.mazeSize} key={i}>
          {cols}
        </MazeRow>
      );
    }
  }

  function getCellColor(i: number, j: number): string {
    const player = props.mazeInfo.player!;
    const end = props.mazeInfo.end!;
    const cell = props.mazeInfo.maze[i][j];

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
    } else if (props.rightPath.some((pos) => pos.x == i && pos.y == j)) {
      return "blue";
    } else if (cell.isWall) {
      return cell.isActive ? "white" : "darkcyan";
    }
    return "white";
  }

  return (
    <Frame>
      <Table onClick={props.onClick}>{rows}</Table>
    </Frame>
  );
};
