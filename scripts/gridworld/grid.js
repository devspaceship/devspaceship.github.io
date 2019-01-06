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

    // Actions : [UP, RIGHT, DOWN, LEFT]
    transition(i, j, a)
    {
        let current = this.map[i][j];
        if (current == TRAP || current == END) { return [i, j, 0]; }

        let a2di = [-1, 0, 1, 0];
        let a2dj = [0, 1, 0, -1];

        let i_ = i + a2di[a];
        let j_ = j + a2dj[a];

        if (i_ < 0 || i_ >= this.n || j_ < 0 || j_ >= this.m) { return [i, j, -1]; }
        else
        {
            let next = this.map[i_][j_]

            if (next == START || next == AIR) { return [i_, j_, -1]; }
            else if (next == TRAP) { return [i_, j_, -100]; }
            else { return [i_, j_, 100]; }
        }
    }

    policy2V(policy, treshold, gamma)
    {
        let V = zeros2D(this.n, this.m);
        let V_ = zeros2D(this.n, this.m);
        
        let d;
        do
        {
            d = 0;
            for (let i = 0; i < this.n; i++)
            {
                for (let j = 0; j < this.m; j++)
                {
                    let [i_, j_, r] = this.transition(i, j, policy[i][j]);
                    V_[i][j] = r + gamma*V[i_][j_]
                    d = Math.max(d, Math.abs(V[i][j] - V_[i][j]));
                }
            }

            for (let i = 0; i < this.n; i++)
            {
                for (let j = 0; j < this.m; j++) { V[i][j] = V_[i][j] }
            }

        } while (d > treshold);

        return V;
    }

    V2policy(V, gamma)
    {
        let pi = zeros2D(this.n, this.m);

        for (let i = 0; i < this.n; i++)
        {
            for (let j = 0; j < this.m; j++)
            {
                let best = Number.NEGATIVE_INFINITY;
                let best_action = 0;

                for (let a = 0; a < 4; a++)
                {
                    let [i_, j_, r] = this.transition(i, j, a);
                    let trial = r + gamma*V[i_][j_];
                    if (trial > best)
                    {
                        best = trial;
                        best_action = a;
                    }
                }

                pi[i][j] = best_action;
            }
        }

        return pi;
    }

    policyIteration(treshold, gamma)
    {
        let V = zeros2D(this.n, this.m);
        let pi = randint2D(this.n, this.m, 4);

        let stable;
        do
        {
            stable = true;

            V = this.policy2V(pi, treshold, gamma);
            let pi_ = this.V2policy(V, gamma);
            
            for (let i = 0; i < this.n; i++)
            {
                for (let j = 0; j < this.m; j++)
                {
                    if (pi[i][j] != pi_[i][j])
                    {
                        stable = false;
                        pi[i][j] = pi_[i][j];
                    }
                }
            }
        } while (!stable);

        return pi;
    }

    valueIteration()
    {
    }

    SARSA()
    {

    }

    QLearning()
    {

    }
}

function zeros2D(n, m)
{
    let zeros = new Array(n);
    for (let i = 0; i < n; i++)
    {
        zeros[i] = new Array(m);
        zeros[i].fill(0);
    }

    return zeros;
}

function randint2D(n, m, k)
{
    let rand = new Array(n);
    for (let i = 0; i < n; i++)
    {
        rand[i] = new Array(m);
        for (let j = 0; j < m; j++)
        {
            rand[i][j] = Math.floor(k*Math.random());
        }
    }

    return rand;
}

function zeros3D(n, m, k)
{
    let zeros = new Array(n);
    for (let i = 0; i < n; i++)
    {
        zeros[i] = new Array(m);
        for (let j = 0; j < m; j++)
        {
            zeros[i][j] = new Array(k);
            zeros[i][j].fill(0);
        }
    }

    return zeros;
}

function drawArrow(i, j, a)
    {
        stroke(200, 175);
        strokeWeight(4);

        let x = j*(CELL_SIZE+3)+3 + CELL_SIZE/2;
        let y = i*(CELL_SIZE+3)+3 + CELL_SIZE/2;
        translate(x, y);
        let scale = 0.35;
        line(-scale*CELL_SIZE, 0, scale*CELL_SIZE, 0);
        line(scale*CELL_SIZE, 0, scale/2*CELL_SIZE, scale/2*CELL_SIZE);
        line(scale*CELL_SIZE, 0, scale/2*CELL_SIZE, -scale/2*CELL_SIZE);
        translate(-x, -y);
    }