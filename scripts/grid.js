const AIR = 0;
const START = 1;
const END = 2;
const TRAP = 3;

class Grid
{
    constructor(n=8, m=12)
    {
        this.n = n;
        this.m = m;

        this.start_i = 0;
        this.start_j = 0;

        this.end_i = n - 1;
        this.end_j = m - 1;

        if (n == 8 && m == 12)
        {
            this.map = [[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
                        [0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
                        [0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
                        [0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]];
        }
        else
        {
            // Initialize the map
            this.map = new Array(n);
            for (let i = 0; i < n; i++)
            {
                this.map[i] = new Array(m);
                this.map[i].fill(AIR);
            }
            this.map[this.start_i][this.start_j] = START;
            this.map[this.end_i][this.end_j] = END;
        }
    }

    draw()
    {
        noStroke();

        for (let i = 0; i < this.n; i++) 
        {
            for (let j = 0; j < this.m; j++) 
            {
                if (this.map[i][j] == AIR) { fill('#303030'); }
                else if (this.map[i][j] == START) { fill('#f49d41'); }
                else if (this.map[i][j] == END) { fill('#42f465'); }
                else { fill('#f44141'); }

                rect(j*(CELL_SIZE+3)+3, i*(CELL_SIZE+3)+3, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}