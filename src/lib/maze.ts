export interface Cell {
    position: Position;
    active: boolean;
    isWall: boolean;
}

export interface Position {
    x: number;
    y: number;
}

export enum Direction {
    Up,
    Right,
    Down,
    Left,
}

export class Maze {
    directions: Direction[] = [Direction.Up, Direction.Right, Direction.Down, Direction.Left];
    maze: Cell[][] = [];
    stack: Position[] = [];
    badPositions: Position[] = [];
    size: number;
    actual: Cell = {
        active: false,
        isWall: false,
        position: {
            x: 0,
            y: 0,
        }
    };

    constructor(size: number) {
        this.size = size * 2 + 1;
    }

    public Main() {
        this.InitializePositions()
        this.CreateMaze()
    }

    private InitializePositions() {
        // init empty maze
        for (let i = 0; i < this.size; i++) {
            var column: Cell[] = [];
            for (let j = 0; j < this.size; j++) {
                var cell: Cell = {
                    active: false,
                    isWall: i % 2 == 0 || j % 2 == 0,
                    position: {
                        x: i,
                        y: j,
                    }
                }
                column.push(cell)
            }
            this.maze.push(column);
        }

        // select random start
        do {
            var random_init_x: number = Math.floor(
                Math.random() * (this.size - 1)
            );
        } while (random_init_x % 2 == 0);

        do {
            var random_init_y: number = Math.floor(
                Math.random() * (this.size - 1)
            );
        } while (random_init_y % 2 == 0);

        this.actual = this.maze[random_init_x][random_init_y];

        // select a random end
        do {
            var random_end_x: number = Math.floor(
                Math.random() * (this.size - 1)
            );
        } while (this.actual.position.x === random_end_x || random_end_x % 2 == 0);

        do {
            var random_end_y: number = Math.floor(
                Math.random() * (this.size - 1)
            );
        } while (this.actual.position.y === random_end_y || random_end_y % 2 == 0);

        // put end cell in the maze
        this.maze[random_end_x][random_end_y].active = true;

        // put start cell in the stack
        this.stack.push(this.actual.position);
    }

    private CreateMaze() {
        let count: number = 0;

        var hasInactiveCell: boolean = true;
        while (hasInactiveCell) {
            console.log("Loading." + ((count == 0) ? "" : (count == 1) ? "." : ".."))
            this.CreatePath()

            // check if still has inactive cell
            hasInactiveCell = this.maze.some((v, index) => {
                if (index % 2 !== 0) {
                    return v.some((a, i) => {
                        return i % 2 !== 0 && !this.maze[index][i].active;
                    });
                }
                return false;
            });


            if (hasInactiveCell) {
                // find all inactive cells
                var inactiveCells = [];
                for (var x = 1; x < this.size - 1; x += 2) {
                    for (var y = 1; y < this.size - 1; y += 2) {
                        if (!this.maze[x][y].active) {
                            inactiveCells.push({ x: x, y: y });
                        }
                    }
                }

                // select random start from inactive cells
                var randomIndex = Math.floor(Math.random() * inactiveCells.length);
                var randomCell = inactiveCells[randomIndex];
                this.actual = this.maze[randomCell.x][randomCell.y];

                this.stack.push(this.actual.position);
            }

            count = (count + 1) % 3;
        }

    }

    private CreatePath() {
        // create path until reach a cell already in the maze
        while (!this.actual.active) {
            var next: Cell | null;
            let dir: Direction | undefined;
            let nextDir: Direction[] = this.directions.slice();
            let countBack: number = 0;

            do {
                dir = nextDir.at(Math.floor(Math.random() * 4));
                if (!dir && nextDir.length == 0) {
                    nextDir = this.Backtrack(countBack);
                    next = null;
                    countBack += 1
                } else {
                    nextDir = nextDir.filter(d => d !== dir);
                    next = this.GetAdj(dir!);
                }
            } while (!next || this.stack.includes(next.position) || this.badPositions.includes(next.position));

            for (let i = 0; i < countBack; i++) {
                this.stack.pop()
            }

            this.SetWall(dir!)

            this.actual = next;
            this.stack.push(this.actual.position)
        }

        // activate all the path and clean stack
        while (this.stack.length > 0) {
            let removed: Position = this.stack.pop()!;
            this.maze[removed.x][removed.y].active = true;
        }

        this.badPositions = [];
    }



    private Backtrack(countBack: number) {
        // get previous cell
        let pos: Position | undefined = this.stack.at(this.stack.length - 2 - countBack)
        if (!pos) {
            return []
        }

        this.badPositions.push(this.actual.position);

        // put wall back
        if (pos.x !== this.actual.position.x) {
            this.maze[(pos.x + this.actual.position.x) / 2][pos.y].active = false
        } else {
            this.maze[pos.x][(pos.y + this.actual.position.y) / 2].active = false
        }

        this.actual = this.maze[pos.x][pos.y]

        return this.directions.slice()
    }

    private GetAdj(dir: Direction) {
        switch (dir) {
            case Direction.Up:
                if (this.actual.position.x > 1) {
                    return this.maze[this.actual.position.x - 2][this.actual.position.y]
                }
                return null
            case Direction.Right:
                if (this.actual.position.y < this.size - 2) {
                    return this.maze[this.actual.position.x][this.actual.position.y + 2]
                }
                return null
            case Direction.Down:
                if (this.actual.position.x < this.size - 2) {
                    return this.maze[this.actual.position.x + 2][this.actual.position.y]
                }
                return null
            case Direction.Left:
                if (this.actual.position.y > 1) {
                    return this.maze[this.actual.position.x][this.actual.position.y - 2]
                }
                return null
            default:
                return null
        }
    }

    private SetWall(dir: Direction) {
        let adj: Cell | null = this.GetAdj(dir)
        if (!adj || !this.stack.includes(adj.position)) {
            switch (dir) {
                case Direction.Up:
                    this.maze[this.actual.position.x - 1][this.actual.position.y].active = true
                    break;
                case Direction.Right:
                    this.maze[this.actual.position.x][this.actual.position.y + 1].active = true
                    break;
                case Direction.Down:
                    this.maze[this.actual.position.x + 1][this.actual.position.y].active = true
                    break;
                case Direction.Left:
                    this.maze[this.actual.position.x][this.actual.position.y - 1].active = true
                    break;
                default:
                    return;
            }
        }
    }

    public PrintMaze() {
        let print: string = "";
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.maze[i][j].isWall) {
                    if (this.maze[i][j].active) {
                        print = print.concat(" ");
                    } else {
                        print = print.concat("@");
                    }
                } else {
                    if (this.maze[i][j].active) {
                        print = print.concat(" ");
                    } else {
                        print = print.concat(" ");
                    }
                }
            }
            print = print.concat("\n");
        }
        console.log("\nMaze: ")
        console.log(print)
    }
}
