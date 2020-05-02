function convertWeight(weight) {
  let newWeight = [];
  let sumWeight = weight.reduce((acc, val) => {
    return (acc += val);
  });
  newWeight = weight.map((val) => val / sumWeight);
  return newWeight;
}

module.exports = convertWeight;
