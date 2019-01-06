const N = 8;
const M = 12;
const CELL_SIZE = 50;
const GRID = new Grid(N, M);

let block_type_select, solver_type_select;
let policy_iter_options, value_iter_options, SARSA_Q_options;

let policy_iter_treshold, policy_iter_gamma;
let value_iter_treshold, value_iter_gamma, value_iter_k;
let SARSA_Q_N, SARSA_Q_gamma, SARSA_Q_alpha, SARSA_Q_eps_0, SARSA_Q_T;

let policy_iter_treshold_label, policy_iter_gamma_label;
let value_iter_treshold_label, value_iter_gamma_label, value_iter_k_label;
let SARSA_Q_N_label, SARSA_Q_gamma_label, SARSA_Q_alpha_label;
let SARSA_Q_eps_0_label, SARSA_Q_T_label;

function setup() 
{
    let cnv = createCanvas(M*CELL_SIZE + (M+1)*3, N*CELL_SIZE + (N+1)*3);
    cnv.parent('canvas-holder');
    cnv.mousePressed(canvasClicked);
    cnv.mouseMoved(canvasClicked);

    block_type_select = select('#block-type');
    solver_type_select = select('#solver-type');
    policy_iter_options = select('#policy_iter_options');
    value_iter_options = select('#value_iter_options');
    SARSA_Q_options = select('#SARSA_Q_options');

    // Link sliders
    policy_iter_treshold = select('#policy_iter_treshold');
    policy_iter_gamma = select('#policy_iter_gamma');

    value_iter_treshold = select('#value_iter_treshold');
    value_iter_gamma = select('#value_iter_gamma');
    value_iter_k = select('#value_iter_k');

    SARSA_Q_N = select('#SARSA_Q_N');
    SARSA_Q_gamma = select('#SARSA_Q_gamma');
    SARSA_Q_alpha = select('#SARSA_Q_alpha');
    SARSA_Q_eps_0 = select('#SARSA_Q_eps_0');
    SARSA_Q_T = select('#SARSA_Q_T');

    // Link sliders labels
    policy_iter_treshold_label = select('#policy_iter_treshold_value');
    policy_iter_gamma_label = select('#policy_iter_gamma_value');

    value_iter_treshold_label = select('#value_iter_treshold_value');
    value_iter_gamma_label = select('#value_iter_gamma_value');
    value_iter_k_label = select('#value_iter_k_value');

    SARSA_Q_N_label = select('#SARSA_Q_N_value');
    SARSA_Q_gamma_label = select('#SARSA_Q_gamma_value');
    SARSA_Q_alpha_label = select('#SARSA_Q_alpha_value');
    SARSA_Q_eps_0_label = select('#SARSA_Q_eps_0_value');
    SARSA_Q_T_label = select('#SARSA_Q_T_value');

    policy_iter_treshold.input(updateSlidersValues);
    policy_iter_gamma.input(updateSlidersValues);

    value_iter_treshold.input(updateSlidersValues);
    value_iter_gamma.input(updateSlidersValues);
    value_iter_k.input(updateSlidersValues);

    SARSA_Q_N.input(updateSlidersValues);
    SARSA_Q_gamma.input(updateSlidersValues);
    SARSA_Q_alpha.input(updateSlidersValues);
    SARSA_Q_eps_0.input(updateSlidersValues);
    SARSA_Q_T.input(updateSlidersValues);

    solver_type_select.changed(updateDom);

    updateDom();
    updateSlidersValues();

    select('#solve_button').mouseClicked(solve);
}
  
function draw() 
{
    background('#303030');
    GRID.draw();
    drawGrid();

    noLoop();
}

function solve()
{
    GRID.solved = false;
    loop();

    let solver = solver_type_select.value();
    if (solver == "policy_iter")
    {
        let tre = Math.pow(10, policy_iter_treshold.value());
        let gamma = policy_iter_gamma.value()/100;
        GRID.policyIteration(tre, gamma);
    }
    else if (solver == "value_iter")
    {
        let tre = Math.pow(10, value_iter_treshold.value());
        let gamma = value_iter_gamma.value()/100;
        let k = value_iter_k.value();
        GRID.valueIteration(tre, gamma, k);
    }
    else
    {
        let N = SARSA_Q_N.value();
        let gamma = SARSA_Q_gamma.value()/100;
        let alpha = SARSA_Q_alpha.value()/100;
        let eps_0 = SARSA_Q_eps_0.value()/100;
        let T = SARSA_Q_T.value();

        if (solver == "sarsa") {GRID.SARSA(N, gamma, alpha, eps_0, T);}
        else {GRID.QLearning(N, gamma, alpha, eps_0, T);}
    }
}

function canvasClicked()
{
    if (mouseIsPressed)
    {
        let i = Math.floor(mouseY/(CELL_SIZE+3));
        let j = Math.floor(mouseX/(CELL_SIZE+3));
        let current = GRID.map[i][j];

        let block_type = block_type_select.value();
        if (block_type == 'air' && current == TRAP)
        {
            GRID.map[i][j] = AIR;
            GRID.solved = false;
        }
        else if (block_type == 'trap' && current == AIR)
        {
            GRID.map[i][j] = TRAP;
            GRID.solved = false;
        }
        else if (block_type == 'start' && (current == AIR || current == TRAP))
        {
            GRID.map[GRID.start_i][GRID.start_j] = AIR;
            GRID.start_i = i;
            GRID.start_j = j;
            GRID.map[i][j] = START;
            GRID.solved = false;
        }
        else if (block_type == 'end' && (current == AIR || current == TRAP))
        {
            GRID.map[GRID.end_i][GRID.end_j] = AIR;
            GRID.end_i = i;
            GRID.end_j = j;
            GRID.map[i][j] = END;
            GRID.solved = false;
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
    let solver = solver_type_select.value();
    if (solver == "policy_iter")
    {
        policy_iter_options.show();
        value_iter_options.hide();
        SARSA_Q_options.hide();
    }
    else if (solver == "value_iter")
    {
        policy_iter_options.hide();
        value_iter_options.show();
        SARSA_Q_options.hide();
    }
    else if (solver == "sarsa" || solver == "q_learning")
    {
        policy_iter_options.hide();
        value_iter_options.hide();
        SARSA_Q_options.show();
    }
}

function updateSlidersValues()
{
    policy_iter_treshold_label.html('1E' + policy_iter_treshold.value());
    policy_iter_gamma_label.html(policy_iter_gamma.value() + '%');

    value_iter_treshold_label.html('1E' + value_iter_treshold.value());
    value_iter_gamma_label.html(value_iter_gamma.value() + '%');
    value_iter_k_label.html(value_iter_k.value());

    SARSA_Q_N_label.html(SARSA_Q_N.value());
    SARSA_Q_gamma_label.html(SARSA_Q_gamma.value() + '%');
    SARSA_Q_alpha_label.html(SARSA_Q_alpha.value() + '%');
    SARSA_Q_eps_0_label.html(SARSA_Q_eps_0.value() + '%');
    SARSA_Q_T_label.html(SARSA_Q_T.value());
}
