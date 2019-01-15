let tess;

function setup()
{
    let cnv = createCanvas(600, 400, WEBGL);
    cnv.parent('canvas-holder');

    tess = createTesseract(60);
}

function draw()
{
    background('#303030');
    stroke('#1eaedb');
    strokeWeight(5);

    directionalLight(255, 255, 255, 0.5, 0.5, -0.75);
    specularMaterial(30, 174, 219);
    
    let rot = createRotation4(frameCount/61, frameCount/129);
    let rot_tess = tess.map(e => matmul(rot, e));
    let proj = projectTesseract(rot_tess);

    rotateY(-HALF_PI);

    drawProj(proj);
}
