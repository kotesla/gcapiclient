const {
  throwWhenInvalidArray,
  throwWhenEmptyArray,
  throwWhenArraysHaveDifferentLength,
  throwWhenEmptyString,
  throwWhenNumberOutsideRange,
  throwWhenInvalidNumber,
  throwArity,
  rootOfSumOfSquares,
  takeFirstElements,
  average,
  takeLastElements,
} = require("../shared/utils");
const {
  throwWhenInvalidMatrix,
  throwWhenInvalidColCountInMatrix,
  getGt,
  getBt,
  getDip,
} = require("../shared/math");

function Payload(emdlid, mAxes, mRef, stdDev, pcOutliersUser) {
  throwArity(arguments, Payload);
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
  throwWhenNumberOutsideRange(
    this.stdDev,
    1,
    3,
    "StdDev must be between 1 and 3",
  );
  throwWhenInvalidNumber(this.pcOutliersUser);
  throwWhenNumberOutsideRange(
    this.pcOutliersUser,
    0,
    15,
    "Max % of outliers must be between 0 and 15",
  );
  this.mRef.forEach((s) =>
    throwWhenNumberOutsideRange(
      s[0],
      0.9,
      1.1,
      "Gravity reference values must be in Std G. ranging from 0.9 to 1.1",
    ),
  );
  this.mRef.forEach((s) =>
    throwWhenNumberOutsideRange(
      s[1],
      0.2,
      0.8,
      "Reference magnetic field intensity must be in Gauss ranging from 0.2 to 0.8",
    ),
  );
  this.mRef.forEach((s) =>
    throwWhenNumberOutsideRange(
      s[2],
      -Math.PI / 2,
      Math.PI / 2,
      "Reference dip angle must be in radians from -2*PI to 2*PI",
    ),
  );
  const averageGt = average(
    this.mAxes.map((s) => getGt(...takeFirstElements(s, 3))),
  );
  const averageBt = average(
    this.mAxes.map((s) => getBt(...takeLastElements(s, 3))),
  );
  throwWhenNumberOutsideRange(
    averageGt,
    0.5,
    1.5,
    "gx, gy, gz must be in Std. G",
  );

  throwWhenNumberOutsideRange(
    averageBt,
    0.2,
    0.8,
    "bx, by, bz must be in Gauss",
  );
};

module.exports = Payload;
