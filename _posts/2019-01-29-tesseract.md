---
layout:     post
title:      Tesseract Animation Tutorial
summary:    Have you ever wondered how the cool rotating tesseract projections are made ?
            Here I explain what a tesseract is, what does it mean to do a rotation in four dimensions and
            how to project the tesseract in three dimensions in a stylish way.
categories:
  - Math
series: 
p5: true
tags:
 - Tesseract
 - Animation
---

{% include articles/tesseract.html %}

## What exactly is a tesseract ?

A tesseract is just a four-dimensional cube.
We can also generalize the cube in $$ n $$ dimensions, 
in which case it is simply called a $$ n $$-hypercube.
But how exactly do we generalize this idea of a cube ?
Let's start with dimension $$ 0 $$, a point.
To transition to dimension $$ 1 $$, you transform the point into a continuum of points to get a line.
To go to dimension $$ 2 $$, we transform this line into a continuum of lines to get a square.
And to get the cube, we repeat the operation with a continuum of planes.
You may have noticed, that here, we were always extruding the next shape from the previous one in an orthogonal manner.
So how are we supposed to extrude the cube into a tesseract ?
Well, we simply need another dimension which is orthogonal to the three firsts, a fourth one.
However, we live in a 3D world, so we can't really visualize what it is supposed to look like,
but what we can do is project it in our 3D world in a way that show its important features and connections.
For our projection using the p5.js library, we are going to define the tesseract of size $$ 2s $$ by its points:

$$ line = \{-s, s\}\\
square = \{(-s, -s), (-s, s), (s, -s), (s, s)\} = \{-s, s\} \times \{-s, s\} = \{-s, s\}^2\\
cube = \{-s, s\} \times \{-s, s\} \times \{-s, s\} = \{-s, s\}^3\\
tesseract = \{-s, s\}^4 $$
Here, $$ \times $$ represents the cartesian product.

[Edd Mann][1] created a very neat code snippet for doing cartesian products in JavaScript, so we are going to use it.

~~~ javascript
const flatten = (arr) => [].concat.apply([], arr);

const product = (...sets) =>
  sets.reduce((acc, set) =>
    flatten(acc.map(x => set.map(y => [ ...x, y ]))),[[]]);
~~~

Once we have our points, we need to determine which points we connect.
To do this, we only have to check the number of dimensions where 2 points differ,
if it is 1 then, it means the 2 points are connected.


## Projecting the tesseract

We are going to use the following projection:

$$ \pi : \mathbb{R}^4 \rightarrow \mathbb{R}^3\\
(x, y, z, w) \rightarrow \frac{(x, y, z)}{\lambda(w)}\\
\lambda(w) = \frac{d}{d - w} \text{ with } d > \max(w) $$

This is actually a [stereographic projection][2]
onto the canonical 3D space. Basically it just scales a point given its 4th coordonate.
If a point is in the space w = 0, it stays the same.
If w < 0, it is going to scale down.
And if w > 0, it is gonna scale up and approach an infinite scaling as w approach d.
Here, d is a parameter of our projection, you can try changing it with the slider under the canvas.


## Rotating the tesseract

Okay, now we have a tesseract and a way to project it into our 3D space.
But it is not moving yet, for this we need to rotate it and not in our 3D space,
otherwise we would just have a static projection rotating on itself. <br>
A rotation matrix in $$ n $$-dimension is a matrix which inversed is its transposed self and have a determinant of 1.
This group is called the special orthogonal group of rank n : $$ SO(n) = \{M : M^TM = MM^T = I \text{ and } |M| = 1\} $$.
Here is the matrix we are going to use:

$$ R(\alpha, \beta, t) = 
\begin{pmatrix} 
R_{\alpha t} & 0_2 \\
0_2 & R_{\beta t} 
\end{pmatrix} $$

Using the already known results for 2D rotations we can verify that $$ R \in SO(4) $$ given 
that $$ R_{\alpha t} \in SO(2) $$ and $$ R_{\beta t} \in SO(2) $$:

$$ R^T =
\begin{pmatrix} 
R_{\alpha t}^T & 0_2 \\
0_2 & R_{\beta t}^T 
\end{pmatrix} = 
\begin{pmatrix} 
R_{-\alpha t} & 0_2 \\
0_2 & R_{-\beta t} 
\end{pmatrix}\\
\text{So, } RR^T = R^TR =
\begin{pmatrix} 
R_{0} & 0_2 \\
0_2 & R_{0} 
\end{pmatrix} =
\begin{pmatrix} 
I_2 & 0_2 \\
0_2 & I_2
\end{pmatrix} $$

Also, $$ |R| = |R_{\alpha t}||R_{\beta t}| = 1 $$ <br> $$ \alpha $$ and $$ \beta $$ represent, 
respectively, the rotation speeds for the XY plane and the ZW plane.
You can also change those parameters' values with the sliders.

## Final notes

  You can find the (not so long) full code [here][3].

[1]: https://eddmann.com/posts/cartesian-product-in-javascript/
[2]: https://en.wikipedia.org/wiki/Stereographic_projection
[3]: https://github.com/devspaceship/devspaceship.github.io/tree/master/scripts/tesseract