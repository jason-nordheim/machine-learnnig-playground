# Matrices

Matrices are created when data is organized into rows and columns to form rectangular-shaped arrays or a 2-dimensional array.

**Definition**: A collection of numbers ordered in rows and columns

> Note: while most matrices are defined with numbers, a matrix can be defined with numbers, symbols or expressions.

Example:

```py
# 2 rows, 3 columns, 6 elements
# we would refer to the matrix below as a 3 by 2 matrix
matrix = [
  [3, 0],
  [-4, 2],
  [3, -5]
]
```

Mathematically we denote matrices using uppercase, italic and bold: _**A**_

### Characteristics:

- Matrices can be of any size (size is denoted by the width and height of the matrix)
- The width of a matrix refers to the number of columns
- The height of a matrix refers to the number of rows
- The size of the matrix is denoted by the total number of values (height \* width)

When we say "m b n matrix" we mean a matrix which has `m` rows and `n` columns

## Arithmetic and Matrices

Basic Arithmetic operations and be applied on Matrices such as:

- Addition
- Multiplication
- Subtraction

## Types of Matrices

- **Rectangular**: a matrix that has a different number of rows and columns
  - typically denoted as a "n by m matrix"
  - e.g. 2 columns & 4 rows:
    ```py
    rectangular_matrix = [
      [3, 0],
      [-4, 2],
      [3, -5],
      [2, 7]
    ]
    ```
- **Square**: a special type of rectangular matrix in which there are the same number or rows and columns
  - typically denoted as a "m by m matrix"
  - e.g. 3 columns & 3 rows:
    ```py
    square_matrix = [
      [3, 0, 5],
      [4, 2, 6],
      [3, 5, 8]
    ]
    ```
- **Symmetric**: a special type of square matrix in which the matrix is formed by elements that are mirred diagonally
  - Example:
    ```py
    symmetric_matrix = [
      [1, 5, 7],
      [5, 2, 9],
      [7, 9, 8]
    ]
    # top-left: [5, 7, 9]
    # bottom-right: [5,7, 9]
    ```
- **Zero**: A matrix in which all elements are equal to zero
  - Example:
    ```py
    zero_matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
    ```
  - Any vector multiped by a zero matrix will result in a zero matrix
- **Identity**: A square matrix in which all zeros (`0`) are on the diagonal axis and all ones (`1`)
  - Denoted mathematically with the capital letter `I`
  - Example:
    ```py
    identity_matrix = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]
    ```
  - Any vector multiplied by an identity matrix will result in the same vector or matrix
- **Diagonal**: A matrix in which all non-diagonal elements are zero (`0`)
  - Example:
    ```py
    # here `a` can represent any non-zero number
    diagonal_matrix = [
      ['a', 0, 0],
      [0, 'a', 0],
      [0, 0, 'a']
    ]
    ```
  - Any scalar multiplied by an identity matrix will result in a diagonal matrix
- Triangular: A square matrix in which the elements on the upper-right or lower-left of the matrix are equal to zero (`0`)
  - Example:
    ```py
    upper_triangular_matrix = [
      [1, 2, 3],
      [0, 4, 5],
      [0, 0, 6]
    ]
    lower_triangular_matrix = [
      [1, 0, 0],
      [2, 3, 0],
      [4, 5, 6]
    ]
    ```

## Matrix Transformations

Any linear transformation in a plane can be specified using vectors or matrices.

Linear transformation in a three-dimensional (3D) space are specified using a matrix that has 9 elements.

Linear Transformations are basically functions that take some inputs and give an output for each input.

```py
# 3D Matrix
three_d_matrix = [
  [a11, a12, a13],
  [a21, a22, a23],
  [a31, a32, a33]
]
```

Representing matrices in 3D enables:

- scaling by a factor in a direction
- reflection across a plane
- rotating by an angle about an axis
- projection onto any plane
- a combination of the above

### Transformations

**Scaling**: Scaling a matrix is done by multiplying the x and y values of a matrix.

```py
def scale_matrix(matrix, scalar):
    scaled_matrix = []  # Create an empty list to store the scaled matrix
    # Iterate through each row in the matrix
    for row in matrix:
        scaled_row = []  # Create an empty list for the scaled row
        # Iterate through each element in the row
        for element in row:
            scaled_element = element * scalar  # Scale the element by the scalar
            scaled_row.append(scaled_element)  # Append the scaled element to the scaled row
        scaled_matrix.append(scaled_row)  # Append the scaled row to the scaled matrix
    return scaled_matrix

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

scalar = 2

scaled_matrix = scale_matrix(matrix, scalar)
print(f"scaling the matrix: {matrix} by {scalar} results in {scale_matrix(matrix, 2)}")
```

**Inversion**: Inversion uses a diagonal matrix with elements: minus one, zero, zero, minus one, and results in flipping x and y coordinates

```py
def invert_matrix(matrix):
    inverted_matrix = []  # Create an empty list to store the inverted matrix
    # Iterate through each row in the matrix in reverse order
    for row in matrix[::-1]:
        inverted_row = []  # Create an empty list for the inverted row
        # Iterate through each element in the row in reverse order
        for element in row[::-1]:
            inverted_row.append(element)  # Append the element to the inverted row
        inverted_matrix.append(inverted_row)  # Append the inverted row to the inverted matrix

    return inverted_matrix

# Example usage:
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

inverted_matrix = invert_matrix(matrix)

print(f'Inverting the matrix: {matrix} results in: {inverted_matrix}')
```

**Rotation** - a type of matrix transformation in which vectors maintain length and rotates upon some angle using a rotation matrix.

```py
import math

def rotate_matrix(matrix, angle_degrees):
    # Convert the angle from degrees to radians
    angle_radians = math.radians(angle_degrees)

    # Get the dimensions of the original matrix
    num_rows = len(matrix)
    num_cols = len(matrix[0])

    # Calculate the center point of the matrix
    center_x = num_cols / 2
    center_y = num_rows / 2

    # Create an empty rotated matrix with the same dimensions
    rotated_matrix = [[0] * num_cols for _ in range(num_rows)]

    # Iterate through the original matrix
    for i in range(num_rows):
        for j in range(num_cols):
            # Calculate the coordinates of the current point relative to the center
            x = j - center_x
            y = i - center_y

            # Apply the rotation transformation
            new_x = x * math.cos(angle_radians) - y * math.sin(angle_radians)
            new_y = x * math.sin(angle_radians) + y * math.cos(angle_radians)

            # Translate the rotated point back to the original coordinate system
            new_i = int(new_y + center_y)
            new_j = int(new_x + center_x)

            # Check if the new coordinates are within the bounds of the matrix
            if 0 <= new_i < num_rows and 0 <= new_j < num_cols:
                rotated_matrix[i][j] = matrix[new_i][new_j]
    return rotated_matrix

# Example usage:
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

angle_degrees = 45  # Rotate by 45 degrees

rotated_matrix = rotate_matrix(matrix, angle_degrees)

print(f'Rotating matrix: {matrix} by {angle_degrees} results in {rotated_matrix}')
```

#### Combining Matrix Transformations

A key attribute of Matrix transformations is that any Matrix transformation operation can be represented with a matrix.

Since any matrix transformation can be represented as a matrix, it is possible to create a combination or composition of matrix transformations into a single transformation.

This is important, since performing multiple transformations on a large dataset, can be expensive and by combining these multiple transformations into a single transformation can reduce computation load and increase the performance of the algorithm. This is referred to as a "Compositional Matrix transformation"

To create a Compositional Matrix transformation:

1. From left to write, we calculate the product of the first two matrix transformations.

- We do this by calculating the "dot product" of the two matrix transformations

2. We represent the product of the first 2 transformations as a new transformation (as a matrix)
3. We then repeat the process until all the transformations have been reduced to a single transformation

This results in the linear combinations of the columns in all the child matrix transformations as scalars

# Inverse and Determinant 

The determinant of a matrix is a scalar with a few important characteristics:
- it enables us to map a squar matrix to a scalar 
- it enables us to determine if a matrix can be inverted

We denote the inversion of a matrix (`A`) as `det(A)`.

Properties of determinants:
- In the case when the determinant matrix equals 0, we know that the matrix cannot be inverted. This is because a matrix with a determinant of 0 indicates that the resulting value would be equivlant to `1/0` which is mathematicall impossible. 
  - This case indicates that we have only "linearly dependent columns" 

