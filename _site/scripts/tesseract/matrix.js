const flatten = (arr) => [].concat.apply([], arr);

const product = (...sets) =>
  sets.reduce((acc, set) =>
    flatten(acc.map(x => set.map(y => [ ...x, y ]))),
    [[]]);

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
    let tess = product([-size, size], [-size, size], [-size, size], [-size, size]);
    tess = tess.map(x => createVector4(...x));
    return tess;
}

function countDifferences(va, vb)
{
    c = 0;
    for(let i = 0; i < 4; i++)
    {
        if (va[i][0] != vb[i][0]) {c++}
    }
    return c;
}

function checkExisting(con, i, j)
{
    res = false;
    for(let c of con)
    {
        if(c[0] == i && c[1] == j) {res = true;}
    }
    return res;
}

function getConnexions(tess)
{
    con = [];
    for(let i = 0; i < tess.length; i++)
    {
        for(let j = 0; j < tess.length; j++)
        {
            if(countDifferences(tess[i], tess[j]) == 1 && !checkExisting(con, j, i))
            {
                con.push([i, j]);
            }
        }
    }
    return con;
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

function projectTesseract(tess, d)
{
    let proj = new Array(tess.length);
    for(let i = 0; i < tess.length; i++)
    {
        stereographic = d / (d - tess[i][3][0]);
        proj[i] = createVector(tess[i][0][0], tess[i][1][0], tess[i][2][0]);
        proj[i].mult(stereographic);
    }

    return proj;
}

function connect(proj, i, j)
{
    a = proj[i];
    b = proj[j];
    line(a.x, a.y, a.z, b.x, b.y, b.z);
}

function drawProj(con, proj)
{
    for(let c of con)
    {
        connect(proj, ...c);
    }
}


