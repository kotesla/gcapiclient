function printObj(obj) {
  console.log(JSON.stringify(obj, null, 3));
}

function sum(numArray) {
  return numArray.reduce((a, b) => a + b, 0);
}

function sumOfSquares(numArray) {
  const squares = numArray.map((s) => s * s);
  return sum(squares);
}

function rootOfSumOfSquares(numArray) {
  const res = Math.sqrt(sumOfSquares(numArray));
  return res;
}

function isValidString(x) {
  try {
    x.split(",");
    return true;
  } catch {
    return false;
  }
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
    throw new Error("Error types must be provided");
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

function throwWhenNumberOutsideRange(num, limLo, limHi, errMsg) {
  throwArity(arguments, throwWhenNumberOutsideRange);
  throwWhenEmptyString(
    errMsg,
    "Error message must be a valid non-empty string",
  );
  if (!isNumberInRange(num, limLo, limHi)) {
    throw new Error(errMsg);
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

function throwWhenEmptyString(str, errMsg) {
  throwArity(arguments, throwWhenEmptyString);
  throwWhenInvalidString(errMsg, "Error message must be a valid string");
  if (isEmptyString(str)) {
    throw new Error(errMsg);
  }
}

function isValidInteger(x) {
  if (!isValidNumber(x)) {
    return false;
  } else if (x === 0) {
    // деление на ноль в следующей проверке,
    // поэтому ноль обрабатываем отдельно
    return true;
  } else {
    const radix = (x, y) => {
      let n = Math.pow(10, y);
      return Math.round(x * n) / n;
    };
    return Math.abs(x / radix(x, 0)) === 1;
  }
}

function throwWhenInvalidInteger(x) {
  if (!isValidInteger(x)) {
    throw new Error("Invalid integer");
  }
}

function takeFirstElements(array, cnt) {
  return takeManyElementsInArray(array, cnt, true);
}

function takeLastElements(array, cnt) {
  return takeManyElementsInArray(array, cnt, false);
}

function takeManyElementsInArray(array, cnt, isAscendingOrder) {
  throwArity(arguments, takeManyElementsInArray);
  throwWhenInvalidArray(array);
  throwWhenInvalidInteger(cnt);
  const res = [];
  const len = array.length;
  if (cnt > array.length) {
    throw new Error(
      "Number of elements asked cannot be larger than array length",
    );
  }
  if (cnt < 0) {
    throw new Error("Nuber of elements must be a positive integer");
  }
  if (isAscendingOrder) {
    for (let i = 0; i < cnt; i++) {
      res.push(array[i]);
    }
  } else {
    for (let i = len - 1; i > len - cnt - 1; i--) {
      res.push(array[i]);
    }
  }
  return res;
}

function average(numArray) {
  return sum(numArray) / numArray.length;
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
  exists,
  rootOfSumOfSquares,
  takeFirstElements,
  takeLastElements,
  average,
};
