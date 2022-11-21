// 封装一些常用的工具类
/**
 * 判断一个字符串是否不为空
 * @param str
 * @returns {boolean}
 */
function isStringNotNull(str) {
    return str !== undefined && str !== null && str.trim() !== "";
}

function isNumberNotZero(num) {
    return num !== undefined && num !== null && num !== 0;
}

export default {
    isStringNotNull,
    isNumberNotZero
}