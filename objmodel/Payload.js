const {
  throwWhenInvalidArray,
  throwWhenEmptyArray,
  throwWhenArraysHaveDifferentLength,
  throwWhenEmptyString,
  throwWhenNumberOutsideRange,
  throwWhenInvalidNumber,
} = require("../shared/utils");
const {
  throwWhenInvalidMatrix,
  throwWhenInvalidColCountInMatrix,
} = require("../shared/math");

function Payload(emdlid, mAxes, mRef, stdDev, pcOutliersUser) {
  this.emdlid = emdlid;
  this.mAxes = mAxes;
  this.mRef = mRef;
  this.stdDev = stdDev;
  this.pcOutliersUser = pcOutliersUser;
  this.throwWhenInvalidInput();
  return this;
}

Payload.prototype.throwWhenInvalidInput = function () {
  [this.mAxes, this.mRef].forEach((s) => {
    throwWhenInvalidArray(s);
    throwWhenEmptyArray(s);
  });
  throwWhenArraysHaveDifferentLength(
    this.mAxes,
    this.mRef,
    "Axes and Reference matrices must have equal number of rows",
  );
  throwWhenEmptyString(
    this.emdlid,
    "Error model id must be a non-empty string",
  );
  throwWhenInvalidMatrix(
    this.mAxes,
    "mAxes must be a valid matrix (an array of arrays)",
  );
  throwWhenInvalidMatrix(
    this.mRef,
    "mRef must be a valid matrix (an array of arrays)",
  );
  throwWhenInvalidColCountInMatrix(
    this.mAxes,
    6,
    "Each row in mAxes matrix must have 6 elements",
  );
  throwWhenInvalidColCountInMatrix(
    this.mRef,
    3,
    "Each row in mRef matrix must have 3 elements",
  );
  throwWhenNumberOutsideRange(this.stdDev, 1, 3);
  throwWhenInvalidNumber(
    this.pcOutliersUser,
    "% of outliers must be a valid number",
  );
};

module.exports = Payload;
