# Vector Basics

Scalar vs. Vector

- Scalar:
  - Representation:
    - represented as a number
    - denoted with a lowercase symbol such as `a` or `b`
  - Examples:
    - weight
    - temperature
    - blood pressure
- Vector
  - Has both a quantity and direction
  - Definition:
    - an order list of numbers
  - Characteristics
    - Dimensionality: the number of elements in the vector
    - Orientation: column or row orientation.
      - we care about orientation since the wrong orientation can lead to unexpected or incorrect results
  - Representation
    - represented as lowercase, bolded Roman letters
    - Arrow printed on top
  - Examples
    - 3D column vector => `x = [1, 2, 3]` (vertically oriented)
    - 2D column vector => `x = [1, 2]` (vertically oriented)
    - 3D row vector => `x = [1, 2, 3]` (horizontally oriented)

> In python, the number of elements in the vector is called the "length" or "shape" of the vector.

## Graphic vs. Geometric interpretation

Algebraically, vectors are ordered lists of numbers.

Graphically, we represent vectors as a line with a specific `length` and `direction`

The two points of the vector are referred to as the "tail" and "head"

- Vector Head: the point at which the vector ends
- Vector Tail: the point at which the vector begins

### Representation of Vectors

In Python, we can represent a vector as a List:

```py
vectorAsList = [1,2,3,4,5]
```

However since most vector operations cannot be performed on a list, the `NumPy` library provides a utility `array` to enable these operations:

In `NumPy` this would look like:

```py
# Simple vector
vectorAsArray = np.array([1,2,3,4,5])

# Row Vector
rowVector = np.array([[1,2,3,4,5]])

# Column Vector
columnVector = np.array([[1], [2], [3], [4], [5]])
```

### Arithmetic with Vectors

#### Addition

To add two vectors, we simply add the corresponding elements.

Note that performing vector addition requires that both vectors have the same dimensionality.

Example:

```py
a = [3, 5, 5, 2, 4]
b = [1, 0, 2, 1, 4]
# index 0: 3 + 1 = 4
# index 1: 5 + 0 = 5
# index 2: 5 + 2 = 7
# index 3: 2 + 1 = 3
# index 4: 4 + 4 = 8
a + b = [4, 5, 7, 3, 8]
```

#### Subtraction

To subtract two vectors, we subtract subtract each of the corresponding elements.

Just like Addition, vector subtraction requires that both vectors have the same dimensionality.

Example:

```py
a = [3, 5, 5, 2, 4]
b = [1, 0, 2, 1, 4]
# index 0: 3 - 1 = 2
# index 1: 5 - 0 = 5
# index 2: 5 - 2 = 3
# index 3: 2 - 1 = 1
# index 4: 4 - 4 = 0
a - b = [2, 5, 3, 1, 0]
```
