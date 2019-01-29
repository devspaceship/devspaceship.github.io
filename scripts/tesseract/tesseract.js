let tess, cons;
let s_d, s_xy, s_zw;
let start;

function setup()
{
    let cnv = createCanvas(600, 400, WEBGL);
    cnv.parent('canvas-holder');

    s_d = select('#slider_d');
    s_xy = select('#slider_xy');
    s_zw = select('#slider_zw');

    tess = createTesseract(60);
    cons = getConnexions(tess);

    start = new Date();
}

function draw()
{
    background('#303030');
    stroke('#1eaedb');

    directionalLight(255, 255, 255, 0.5, 0.5, -0.75);
    
    let t = new Date();
    t = t - start;
    let rot = createRotation4(t/7000*s_xy.value(), t/7000*s_zw.value());
    let rot_tess = tess.map(e => matmul(rot, e));
    let proj = projectTesseract(rot_tess, s_d.value());

    rotateY(-HALF_PI);

    strokeWeight(7);
    drawProj(cons, proj);
    strokeWeight(16)
    for(let p of proj)
    {
        point(p.x, p.y, p.z);
    }
}