# Matrices from Orthogonality to Gram-Schmidt Process

**Change of Basis Matrix**: A change in the basis of a matrix results in a matrix that translates vector representation from one basis (such as a coordinate system) to another basis. This type of transformation allows us to perform transforms **when the new basis vectors are not orthogonal to each other**.

Example:

```py
A = [
  [1, 2],
  [3, 1]
]
a = [1,1]

print(numPy.dot(A,a)) # [3,4]
```

We can also use **reverse transformation** to transform an alternative vector space into a standard coordinate system by finding the **inverse transformation matrix**.

For a simple two-by-two matrix `A`:

```py
A = [
  [a, b],
  [c, d]
]
```

To transform this into the standard coordinate system we use the determinate:

```py
numPy.linalg.det(A)
```

This can be verified using the product of matrix `A` and the inversion of matrix `A` which should return an identity matrix if transformed correctly.

## Matrix Transformations

Matrix transformations are special functions that arise as a result of matrix multiplication.

In mathematics, we define an **ordered n-tuple** as a sequence of real numbers and a solution of a linear system in which n unknowns can be written as:

```
x1 = s1, x2 = s2 until xn = sn
```

The set of ordered n-tuples of real numbers is denoted with a `n:Rⁿ`

- The elements for `Rⁿ` are called vectors
- the standard basis vectors are denoted as `e₁, e₂, ...eₙ`
- all other vector, represented by `x` can be written as `x = x₁e₁ + x₂e₂ ... +xₙeₙ`

Since **matrix transformation** refers to a special class of functions, matrix transformation functions are mathematically represented as:

<italic>T:R<sup>n</sup>→R<sup>m<sup>

In Linear Algebra and a traditional cartesian point system, this would be referred to as `y = Ax`

The syntax above denotes that Matrix Transformation `T` maps a vector `x` in <code>R<sup>m</sup></code> into the vector `y` in by multiplying `x` with `A` - or more explicitly: `y = Tₐ(x)`

Example: Transform a vector `b` to any basis by:

1. Transform the vector `b` to our standard coordiante system using the appropriate transformation matrix such that `A` results in `b':Ab=b'`
2. Perform a custom transform on `b'`
3. Transformation is represented by the matrix `R`
4. This gives us a rotated vector `c'` in the standard coordinate system denoted as `c':Rb' ='`
5. Transform `c'` back to the alternative coordinate system using the inverse of `A` that will result in the vector `c`
6. `c` can then be represented as `A⁻¹RA =R'`

## Orthogonal Matrices & Vectors

### Orthogonal Vectors

Standard basis vectors are **orthonormal**, meaning that they are orthogonal to each other.

We can represent these vectors as `e₁ = [1,0]` and `e₂ = [0,1]`

### Orthogonal Matrices

Orthogonal Matrices are typically denoted with `Q` and are comprised of vectors that make up all of the rows and columns of the orthogonal matrix.

In order to understand what this means and its implications, we need to understand the idea of a **transpose matrix**.

A **transpose matrix** is a flipped version of the original matrix, created by switching rows and columns.

So given matrix `A` as:

```py
a [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
```

The corresponding transposed matrix is represented as <code>A<sup>t</sup></code>

```py
A_t = [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
]
```

> With Transpose Matrices, the diagonal elements remain the same.

An important propoerty of orthogonal matrices is that the multiplication of <code>A<sup>t</sup></code> with <code>A</code> is equivilant to the product of <code>A</code> and <code>A<sup>t</sup></code> and both are equal to the identity matrix

## Gram-Schmidt Process

The **Gram-Schmidt Process** is used to transform any basis to orthogonal basis. We leverage this process since performing calculations on orthogonal basis is much simpler.

The process:

1. Take a matrix
2. The first column of the matrix remains the same
3. We then perform an orthogonal transform on the second column relative to the first column.
4. We then perform an orthogonal transform to the third column relative to the second column and first column (again).

... this process repeats until the last column of the matrix. At the end, we will have a matrix in which all columns are orthogonal, but the matrix itself is **not** orthogonal due to the fact that all columns are unit length.

6. Normalize each column by scaling each column vector by 1 over its magnitude.

With this normalization complete, the resulting matrix will have all all the columns in pairwise orthogonal format and of unit length.
