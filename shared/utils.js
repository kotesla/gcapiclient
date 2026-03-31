function printObj(obj) {
  console.log(JSON.stringify(obj, null, 3));
}

function isValidString(x) {
  try {
    x.split(",");
    return true;
  } catch {
    return false;
  }
}

function isEqualString(x, y) {
  if (isValidString(x) && isValidString(y)) {
    return y.includes(x) && x.includes(y);
  } else throw new Error("Both function arguments must be of type String");
}

function isValidNumber(x) {
  if (x === null || isValidString(x)) {
    return false;
  }
  try {
    x = x / 2;
    return !Number.isNaN(x);
  } catch {
    return false;
  }
}

function throwWhenInvalidNumber(number) {
  if (!isValidNumber(number)) {
    throw new Error("Invalid number");
  }
}

function isValidArray(arr) {
  return Array.isArray(arr);
}

function throwWhenInvalidArray(arr) {
  if (!isValidArray(arr)) {
    throw new Error("Invalid array");
  }
}

function throwWhenEmptyArray(arr) {
  if (arr.length < 1) {
    throw new Error("Empty array");
  }
}

function throwWhenArraysHaveDifferentLength(arrA, arrB) {
  if (arrA.length !== arrB.length) {
    throw new Error("Arrays have different length");
  }
}

function isNumberInRange(num, limLo, limHi) {
  [num, limLo, limHi].forEach((s) => throwWhenInvalidNumber(s));
  return num <= limHi && num >= limLo;
}

function throwWhenNumberOutsideRange(num, limLo, limHi) {
  if (!isNumberInRange(num, limLo, limHi)) {
    throw new Error("Number outside of range allowed");
  }
}

module.exports = {
  printObj,
  throwWhenInvalidNumber,
  throwWhenInvalidArray,
  throwWhenEmptyArray,
  throwWhenArraysHaveDifferentLength,
  throwWhenNumberOutsideRange,
};
