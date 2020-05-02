function getCommon(arr1, arr2) {
  arr1.sort();
  arr2.sort();
  var common = [];
  var i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] == arr2[j]) {
      common.push(arr1[i]);
      i++;
      j++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else {
      j++;
    }
  }

  return common;
}

function convertPreverence(input, preference) {
  let newInput = [];
  for (let i = 0; i < input.length; i++) {
    newInput[i] = [];
    for (let j = 0; j < input[i].length; j++) {
      if (j < 5) {
        newInput[i].push(Math.abs(input[i][j] - preference[j]));
      } else if (j == 8) {
        const val = input[i][j] == preference[j] ? 1 : 0;
        newInput[i].push(val);
      } else {
        let nilai = 0;
        const commonValue = getCommon(input[i][j], preference[j]);
        nilai = commonValue.length / preference[j].length;
        newInput[i].push(nilai);
      }
    }
  }
  return newInput;
}

module.exports = convertPreverence;
