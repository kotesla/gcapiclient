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

function throwArity(args, func) {
  if (args.length !== func.length)
    throw new Error("Not enough or too many arguments were passed to function");
}

function exists(obj) {
  return obj !== undefined && obj !== null;
}

function throwWhenDoesNotExist(obj, errMsg) {
  throwArity(arguments, throwWhenDoesNotExist);
  if (!exists(errMsg)) {
    throw new Error("Error objmodel must be provided");
  }
  if (!exists(obj)) {
    throw new Error(errMsg);
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
  throwArity(arguments, throwWhenNumberOutsideRange);
  if (!isNumberInRange(num, limLo, limHi)) {
    throw new Error(`Number outside of range allowed (${limLo}-${limHi})`);
  }
}

function throwWhenInvalidString(str, msg) {
  throwArity(arguments, throwWhenInvalidString);
  if (!isValidString(str)) {
    throw new Error(msg);
  }
}

function isEmptyString(x) {
  throwArity(arguments, isEmptyString);
  return isValidString(x) && [...x.trim()].length < 1;
}

function throwWhenEmptyString(str, msg) {
  throwArity(arguments, throwWhenInvalidString);
  throwWhenInvalidString(msg, "Message must be a valid non-empty string");
  if (isEmptyString(str)) {
    throw new Error(msg);
  }
}

module.exports = {
  printObj,
  throwWhenEmptyString,
  throwWhenInvalidNumber,
  throwWhenInvalidArray,
  throwWhenEmptyArray,
  throwWhenArraysHaveDifferentLength,
  throwWhenNumberOutsideRange,
  throwArity,
  throwWhenDoesNotExist,
};
