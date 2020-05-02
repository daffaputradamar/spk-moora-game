const transpose = require("./transpose");

function rank(arr) {
  const sorted = arr.slice().sort(function (a, b) {
    return b - a;
  });
  const ranks = arr.map(function (v) {
    return sorted.indexOf(v) + 1;
  });
  return ranks;
}

function rankAlt(yi) {
  const ranked = rank(yi);
  const rankedAlt = yi.reduce((arr, val, index) => {
    const newObj = {
      rank: ranked[index],
      value: val,
    };
    return [...arr, newObj];
  }, []);
  return rankedAlt;
}

function sumSquare(transposedVal) {
  return transposedVal.reduce((sumArray, alt) => {
    let sum = alt.reduce((sum, val) => {
      return sum + Math.pow(val, 2);
    }, 0);
    return [...sumArray, sum];
  }, []);
}

function normalization(decision, sumSquareArr) {
  return decision.reduce((arr, alt) => {
    const arrCriteria = alt.reduce((arrCriteria, val, index) => {
      const newArrCriteria = val / Math.sqrt(sumSquareArr[index]);
      return [...arrCriteria, newArrCriteria];
    }, []);
    return [...arr, arrCriteria];
  }, []);
}

function optimization(normalization, weight) {
  return normalization.reduce((arr, alt) => {
    const arrCriteria = alt.reduce((arrCriteria, val, index) => {
      const newArrCriteria = val * weight[index];
      return [...arrCriteria, newArrCriteria];
    }, []);
    return [...arr, arrCriteria];
  }, []);
}

function yiMatrix(optimization, isBenefitArr) {
  const maxmin = optimization.reduce((arr, alt) => {
    const newArr = alt.reduce((acc, val, index) => {
      if (isBenefitArr[index]) {
        if (!acc[0]) {
          acc[0] = 0;
        }
        acc[0] += val;
      } else {
        if (!acc[1]) {
          acc[1] = 0;
        }
        acc[1] += val;
      }
      return acc;
    }, []);
    const maxminYi = [...newArr, newArr[0] - newArr[1]];
    return [...arr, maxminYi];
  }, []);
  return maxmin;
}

function yi(optimization, isBenefitArr) {
  const maxmin = optimization.reduce((arr, alt) => {
    const newObj = alt.reduce((acc, val, index) => {
      if (isBenefitArr[index]) {
        if (!acc["max"]) {
          acc["max"] = 0;
        }
        acc["max"] += val;
      } else {
        if (!acc["min"]) {
          acc["min"] = 0;
        }
        acc["min"] += val;
      }
      return acc;
    }, {});
    return [...arr, newObj];
  }, []);

  return maxmin.reduce((arr, val) => {
    const newVal = val["max"] - val["min"];
    return [...arr, newVal];
  }, []);
}
function moora(decision, weight, isBenefit) {
  const decisionTransposed = transpose(decision);
  const criteriaSumSquared = sumSquare(decisionTransposed);

  const decisionNormalized = normalization(decision, criteriaSumSquared);
  const decisionOptimized = optimization(decisionNormalized, weight);

  const yiMat = yiMatrix(decisionOptimized, isBenefit);

  const altRanked = rankAlt(yi(decisionOptimized, isBenefit));
  return {
    normalized: decisionNormalized,
    optimized: decisionOptimized,
    yi: yiMat,
    ranked: altRanked,
  };
}

module.exports = moora;
