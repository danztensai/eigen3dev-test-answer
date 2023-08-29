function diagonalDifference(matrix) {
    let primaryDiagonal = 0;
    let secondaryDiagonal = 0;
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        primaryDiagonal += matrix[i][i];
        secondaryDiagonal += matrix[i][n - i - 1];
    }
    return Math.abs(primaryDiagonal - secondaryDiagonal);
}

const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];
const difference = diagonalDifference(matrix);
console.log(difference); // Output: 3
