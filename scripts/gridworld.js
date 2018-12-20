const N = 8;
const M = 12;
const CELL_SIZE = 50;

function setup() 
{
    let cnv = createCanvas(M*CELL_SIZE + (M+1)*3, N*CELL_SIZE + (N+1)*3);
    cnv.parent('canvas-holder');
    noLoop();
}
  
function draw() 
{
    background(30);
    drawGrid();
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