const transpose = require("./transpose");

function normalize(arr, { min, max }) {
  let normalizedColumn = [];
  let restNormalizedColumn = [];
  for (let i = 0; i < arr.length; i++) {
    [a, b, c, d, e, ...rest] = arr[i];
    normalizedColumn.push([a, b, c, d, e]);
    restNormalizedColumn.push(rest);
  }
  let normalizedArray = normalizeArray(normalizedColumn, { min, max });
  for (let i = 0; i < normalizedArray.length; i++) {
    normalizedArray[i].push(...restNormalizedColumn[i]);
  }
  return normalizedArray;
}

function normalizeArray(arr, { min, max }) {
  const transposedArr = transpose(arr);
  const normalizedArray = transposedArr.reduce((acc, val) => {
    const minOld = Math.min(...val);
    const maxOld = Math.max(...val);

    const newVal = val.reduce((valAcc, valVal) => {
      const newValVal =
        ((max - min) / (maxOld - minOld)) * (valVal - minOld) + min;
      return [...valAcc, newValVal];
    }, []);
    return [...acc, newVal];
  }, []);

  const undoTranspose = transpose(normalizedArray);
  return undoTranspose;
}

module.exports = normalize;
