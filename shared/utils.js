function isValidString(x) {
    try {
        x.split(',');
        return true;
    } catch {
        return false;
    }
}

function isEqualString(x, y) {
    if (isValidString(x) && isValidString(y)) {
        return y.includes(x) && x.includes(y);
    } else
        throw new Error(
            'Both function arguments must be of type String'
        );
}

module.exports = {isEqualString}