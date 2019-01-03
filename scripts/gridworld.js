const N = 8;
const M = 12;
const CELL_SIZE = 50;
const GRID = new Grid(N, M);

function setup() 
{
    let cnv = createCanvas(M*CELL_SIZE + (M+1)*3, N*CELL_SIZE + (N+1)*3);
    cnv.parent('canvas-holder');
    cnv.mousePressed(canvasClicked);
    cnv.mouseMoved(canvasClicked);

    let solver = select('#solver-type');
    solver.changed(updateDom);
}
  
function draw() 
{
    background('#303030');
    GRID.draw();
    drawGrid();

    noLoop();
}

function canvasClicked()
{
    if (mouseIsPressed)
    {
        let i = Math.floor(mouseY/(CELL_SIZE+3));
        let j = Math.floor(mouseX/(CELL_SIZE+3));
        let current = GRID.map[i][j];

        let block_type = select('#block-type').value();
        if (block_type == 'air' && current == TRAP) { GRID.map[i][j] = AIR; }
        else if (block_type == 'trap' && current == AIR) { GRID.map[i][j] = TRAP; }
        else if (block_type == 'start' && (current == AIR || current == TRAP))
        {
            GRID.map[GRID.start_i][GRID.start_j] = AIR;
            GRID.start_i = i;
            GRID.start_j = j;
            GRID.map[i][j] = START;
        }
        else if (block_type == 'end' && (current == AIR || current == TRAP))
        {
            GRID.map[GRID.end_i][GRID.end_j] = AIR;
            GRID.end_i = i;
            GRID.end_j = j;
            GRID.map[i][j] = END;
        }

        loop();
    }
}

function drawGrid()
{
    stroke(200);
    strokeWeight(3);

    for (let i = 0; i <= N; i++) 
    {
        line(0, i*(CELL_SIZE+3)+1, width-1, i*(CELL_SIZE+3)+1);
    }

    for (let j = 0; j <= M; j++) 
    {
        line(j*(CELL_SIZE+3)+1, 0, j*(CELL_SIZE+3)+1, height-1);
    }
}

function updateDom()
{
    let solver = select('#solver-type').value();
    if (solver == "policy_iter")
    {
        select('#policy_iter_options').show();
    }
    else if (solver == "value_iter")
    {
        select('#policy_iter_options').hide();
    }
}

