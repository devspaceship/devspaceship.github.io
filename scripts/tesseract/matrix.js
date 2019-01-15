function createVector4(x, y, z, w)
{
    let vec = new Array(4);
    for(let i = 0; i < vec.length; i++)
    {
        vec[i] = new Array(1);
    }

    vec[0][0] = x;
    vec[1][0] = y;
    vec[2][0] = z;
    vec[3][0] = w;

    return vec;
}

function createTesseract(size)
{
    let tess = new Array(16);
    
    let s = size;

    tess[0] = createVector4(-s, -s, s, s);
    tess[1] = createVector4(s, -s, s, s);
    tess[2] = createVector4(s, s, s, s);
    tess[3] = createVector4(-s, s, s, s);

    tess[4] = createVector4(-s, -s, -s, s);
    tess[5] = createVector4(s, -s, -s, s);
    tess[6] = createVector4(s, s, -s, s);
    tess[7] = createVector4(-s, s, -s, s);

    tess[8] = createVector4(-s, -s, s, -s);
    tess[9] = createVector4(s, -s, s, -s);
    tess[10] = createVector4(s, s, s, -s);
    tess[11] = createVector4(-s, s, s, -s);

    tess[12] = createVector4(-s, -s, -s, -s);
    tess[13] = createVector4(s, -s, -s, -s);
    tess[14] = createVector4(s, s, -s, -s);
    tess[15] = createVector4(-s, s, -s, -s);

    return tess;
}

function createRotation4(a, b)
{
    let rot = [
        [Math.cos(a), -Math.sin(a), 0, 0],
        [Math.sin(a), Math.cos(a), 0, 0],
        [0, 0, Math.cos(b), -Math.sin(b)],
        [0, 0, Math.sin(b), Math.cos(b)]
    ];
    
    return rot;
}

function matmul(a, b)
{
    if (a[0].length != b.length) {throw "Dimensions do not accord.";}

    let c = new Array(a.length);
    for(let i = 0; i < c.length; i++)
    {
        c[i] = new Array(b[0].length);
    }

    for(let i = 0; i < c.length; i++)
    {
        for(let j = 0; j < c[0].length; j++)
        {
            let s = 0;
            for(let k = 0; k < a[0].length; k++)
            {
                s += a[i][k]*b[k][j];
            }
            c[i][j] = s;
        }
    }

    return c;
}

function projectTesseract(tess)
{
    let proj = new Array(tess.length);
    for(let i = 0; i < tess.length; i++)
    {
        stereographic = 250 / (250 - tess[i][3][0]);
        proj[i] = createVector(tess[i][0][0], tess[i][1][0], tess[i][2][0]);
        proj[i].mult(stereographic);
    }

    return proj;
}

function connect(a, b)
{
    line(a.x, a.y, a.z, b.x, b.y, b.z);
}

function drawProj(proj)
{
    for(let i = 0; i < 4; i++)
    {
        connect(proj[i], proj[(i+1) % 4]);
    }
    for(let i = 4; i < 8; i++)
    {
        connect(proj[i], proj[(i+1) % 4 + 4]);
    }
    for(let i = 0; i < 4; i++)
    {
        connect(proj[i], proj[i + 4]);
    }

    for(let i = 8; i < 12; i++)
    {
        connect(proj[i], proj[(i+1) % 4 + 8]);
    }
    for(let i = 12; i < 16; i++)
    {
        connect(proj[i], proj[(i+1) % 4 + 12]);
    }
    for(let i = 8; i < 12; i++)
    {
        connect(proj[i], proj[i + 4]);
    }

    for(let i = 0; i < 8; i++)
    {
        connect(proj[i], proj[i + 8]);
    }
}