# Eigenvalues and Eigenvectors

**Eigenvalues** and **eigenvectors** are the heart of **eigendecomposition**.

- Also called "eigenvalue decomposition" or "eigenvector decomposition".
- also referred to as characteristic values and characteristic vectors respectively.

> Eigenvalues and eigenvectors make ML models easier to train because it reduces the amount of required data.

- Eigenvalue and Eigenvectors are only defined for square matrices.
- The goal is to extract pairs of eigenvalues and eigenvectors
- Each eigenvalue has an associated eigenvector

Mathematically, this is expressed as: `A · v = w`

- `A` represents a transformation matrix
- `v` represents an input vector
- `w` represents an output vector

> Output vector `w` is a scaled representation of the input vector

More specifically Eigendecomposition can be represented as: `ƛ · v = w` or `ƛ · v = A · v`

- `ƛ` represents the eigenvalue
- `v` represents the eigenvector

> A number `ƛ` is said to be an eigenvalue of `A` if there exists a nonzero solution vector `K` of the linear system `AK = ƛK` where `A` is a `n` by `n` matrix.

> The solution vector `K` is said to be an eigenvector corresponding to the eigenvalue lambda (`ƛ`)

## Calculating Eigenvalues and Eigenvectors

Mathematically, we know that if we multiply matrix `A` with some vector `v`, it is the same as multiplying vector `v` by some scalar `ƛ`.

- In this scenario, vector `v` is called the eigenvector and scalar lambda associated with the eigenvalue of matrix `A`

We represent this fact with: `A·v-ƛ·v=0` or `(A-ƛ·I)v=0`

We can validate this fact by getting the determinant of `(A-ƛ·I)` and checking that the result equals `0` (e.g. `det(A-ƛ·I)=0`)
