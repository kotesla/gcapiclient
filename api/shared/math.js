const {
    throwWhenInvalidNumber,
    throwWhenInvalidArray,
    throwWhenEmptyArray,
    throwWhenArraysHaveDifferentLength,
    throwWhenEmptyString,
    rootOfSumOfSquares,
} = require('./utils');

function getStandardG() {
    return 9.80665;
}

const createRectArray = (cntRow, cntCol, value) => {
    [cntRow, cntCol, value].forEach((s) => throwWhenInvalidNumber(s));
    const rows = new Array(cntRow);
    for (let i = 0; i < cntRow; i++) {
        rows[i] = new Array(cntCol).fill(value);
    }
    return rows;
};

function matrixTranspose(A) {
    const cntRow = A.length;
    const cntCol = A[0].length;
    let res = createRectArray(cntCol, cntRow, 0);
    for (let c = 0; c < cntCol; c++) {
        for (let r = 0; r < cntRow; r++) {
            res[c][r] = A[r][c];
        }
    }
    return res;
}

function throwWhenInvalidColCountInMatrix(
    matrix,
    colCountExpected,
    errMsg
) {
    throwWhenEmptyString(
        errMsg,
        'Error types must be a valid non-empty string'
    );
    if (matrixTranspose(matrix).length !== colCountExpected) {
        throw new Error(errMsg);
    }
}

function throwWhenInvalidMatrix(matrix, errMsg) {
    throwWhenEmptyString(
        errMsg,
        'Error types must be a valid non-empty string'
    );
    try {
        throwWhenInvalidArray(matrix);
        throwWhenEmptyArray(matrix);
        for (let row of matrix) {
            throwWhenInvalidArray(row);
            throwWhenEmptyArray(row);
            throwWhenArraysHaveDifferentLength(row, matrix[0]);
            for (let num of row) {
                throwWhenInvalidNumber(num);
            }
        }
    } catch {
        throw new Error(errMsg);
    }
}

function getGt(gx, gy, gz) {
    return rootOfSumOfSquares([gx, gy, gz]);
}
function getBt(bx, by, bz) {
    return rootOfSumOfSquares([bx, by, bz]);
}

module.exports = {
    throwWhenInvalidColCountInMatrix,
    throwWhenInvalidMatrix,
    getGt,
    getBt,
    getStandardG,
};
