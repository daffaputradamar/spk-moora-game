function transpose(matrix) {
  const newMatrix = matrix[0].map((col, i) => matrix.map((row) => row[i]));
  return newMatrix;
}

module.exports = transpose;
