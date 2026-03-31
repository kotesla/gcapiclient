const {
  throwWhenInvalidArray,
  throwWhenEmptyArray,
  throwWhenArraysHaveDifferentLength,
  throwWhenNumberOutsideRange,
  throwWhenInvalidNumber,
} = require("../shared/utils");
const { throwWhenInvalidColCountInMatrix } = require("../shared/math");

function throwWhenInvalidInput(
  mAxes,
  mRef,
  accTerms,
  magTerms,
  numSko,
  pcOutliersUser,
) {
  [mAxes, mRef, accTerms, magTerms].forEach((s) => {
    throwWhenInvalidArray(s);
    throwWhenEmptyArray(s);
  });
  throwWhenArraysHaveDifferentLength(
    mAxes,
    mRef,
    "Axes and Reference matrices must have equal number of rows",
  );
  throwWhenArraysHaveDifferentLength(
    accTerms,
    magTerms,
    "Accel. and magn. terms arrays must have equal number of elements",
  );
  throwWhenInvalidColCountInMatrix(
    mAxes,
    6,
    "Each row in axes matrix must have 6 elements",
  );
  throwWhenInvalidColCountInMatrix(
    mRef,
    3,
    "Each row in reference matrix must have 3 elements",
  );
  throwWhenNumberOutsideRange(
    numSko,
    1,
    3,
    "Number of standard deviations must be between 1 and 3",
  );
  throwWhenInvalidNumber(
    pcOutliersUser,
    "Max % outliers must be a valid number",
  );
}

module.exports = { throwWhenInvalidInput };
