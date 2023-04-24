import { Cell, Position } from "./maze";

export class DepthSearchMaze {
  maze: Cell[][];
  rightPath: Position[] = [];
  start: Position;
  end: Position;
  movePositions: Position[] = [
    { x: 0, y: 1 }, // right
    { x: 1, y: 0 }, // down
    { x: 0, y: -1 }, // left
    { x: -1, y: 0 }, // up
  ];

  constructor(maze: Cell[][], start: Position, end: Position) {
    this.maze = maze;
    this.start = start;
    this.end = end;
  }

  findRightPath(): Position[] {
    this.move(this.start, { x: 0, y: 0 });

    return this.rightPath;
  }

  private move(actual: Position, previous: Position): Boolean {
    if (actual.x == this.end.x && actual.y == this.end.y) {
      return true;
    }

    for (const direction of this.movePositions) {
      if (
        this.canMove(
          { x: actual.x + direction.x, y: actual.y + direction.y },
          previous
        )
      ) {
        if (
          this.move(
            { x: actual.x + direction.x, y: actual.y + direction.y },
            actual
          )
        ) {
          this.rightPath.push(actual);
          return true;
        }
      }
    }

    return false;
  }

  private canMove(next: Position, previous: Position): Boolean {
    if (
      next.x > 0 &&
      next.x < this.maze.length - 1 &&
      next.y > 0 &&
      next.x < this.maze.length - 1 &&
      (previous.x != next.x || previous.y != next.y) &&
      (!this.maze[next.x][next.y].isWall || this.maze[next.x][next.y].isActive)
    ) {
      return true;
    }
    return false;
  }
}
