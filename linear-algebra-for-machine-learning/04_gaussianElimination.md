# Gaussian Elimination

In the 1800s German mathematician Karl Gauss invented a method fro solving a system of linear equations. This algorithm is hence named "Gaussian elimination".

Problem: Solving linear equations manually becomes tedious when there are 3 or more equations.

In Gaussian elimination. The matrices involved are concatenated into a "augmented matrix" and then performing a series of elementary row operations (add, subtract, or multiply) on the augmented matrix in a particular order and results in 1 of 3 possible scenarios:

1. System finds solution
2. System does not have a solution
3. System has an infinite number of solutions

Steps of Performing Gaussian Elimination:

1. Converting system, with matrix-vector equation
2. Augmenting the coefficient matrix with the vector of constants.

- this should be a column matrix represented as coefficient values for each variable

3. Creating a matrix with ones on diagonals

- Rules:
  - Any two rows may be interchanged
  - each row can be multiplied or dived by a nonzero constant
  - a nonzero multiple of one row can be added or subtracted to/from another row

4. Mapping the matrix back to equations
5. Substitution to solve for variables

> Partial Pivoting: Swapping of two rows to move the pivot element into place

Example:

```py
import sys

def gaussian_elimination(matrix, constants):
    num_rows = len(matrix)
    num_cols = len(matrix[0])

    # Combine the matrix and constants to create the coefficient matrix
    augmented_matrix = [matrix[i] + [constants[i][0]] for i in range(num_rows)]

    for i in range(num_rows):
        # Partial pivoting: find the row with the maximum value in the current column
        max_row = i
        for k in range(i + 1, num_rows):
            if abs(augmented_matrix[k][i]) > abs(augmented_matrix[max_row][i]):
                max_row = k

        # Swap the current row with the row containing the maximum value
        augmented_matrix[i], augmented_matrix[max_row] = augmented_matrix[max_row], augmented_matrix[i]

        # Make the diagonal element of the current row 1
        pivot = augmented_matrix[i][i]
        if pivot == 0:
            sys.exit("No unique solution exists")

        for j in range(i, num_cols + 1):
            augmented_matrix[i][j] /= pivot

        # Eliminate other rows
        for k in range(num_rows):
            if k != i:
                factor = augmented_matrix[k][i]
                for j in range(i, num_cols + 1):
                    augmented_matrix[k][j] -= factor * augmented_matrix[i][j]

    # Extract the solution(s)
    solutions = [augmented_matrix[i][num_cols] for i in range(num_rows)]

    return solutions

# Example usage:
matrix = [
    [2, 1, -1],
    [-3, -1, 2],
    [-2, 1, 2]
]

constants = [
    [8],
    [-11],
    [-3]
]

solutions = gaussian_elimination(matrix, constants)
print("Solutions:", solutions)
```
