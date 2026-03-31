const {throwWhenInvalidNumber, throwWhenInvalidArray, throwWhenEmptyArray, throwWhenArraysHaveDifferentLength} = require("./utils");

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
) {
    if (matrixTranspose(matrix).length !== colCountExpected) {
        throw new Error(`Matrix must have ${colCountExpected} columns`);
    }
}

function throwWhenInvalidMatrix(matrix) {
    throwWhenInvalidArray(matrix);
    throwWhenEmptyArray(matrix);
    const tasks = [];
    for (let row of matrix) {
        throwWhenInvalidArray(row);
        throwWhenEmptyArray(row);
        throwWhenArraysHaveDifferentLength(row, matrix[0]);
        for (let num of row) {
            throwWhenInvalidNumber(num);
        }
    }
}

module.exports = {matrixTranspose, throwWhenInvalidMatrix, throwWhenInvalidColCountInMatrix}