const {
  throwWhenInvalidArray,
  throwWhenEmptyArray,
  throwWhenArraysHaveDifferentLength,
  throwWhenNumberOutsideRange,
  throwWhenInvalidNumber,
  throwWhenEmptyString,
} = require("../shared/utils");
const {
  throwWhenInvalidColCountInMatrix,
  throwWhenInvalidMatrix,
} = require("../shared/math");

module.exports = { throwWhenInvalidInput };
