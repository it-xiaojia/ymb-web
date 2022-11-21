// 为自定义js获得Vue实例
let context = null;

/**
 * 使得自定义的js得到Vue实例
 *
 * @param vueContext Vue实例
 */
function setContext(vueContext) {
    if (context === null) {
        context = vueContext;
        console.log("成功得到Vue实例")
    }
}

/**
 * 获取Vue实例
 *
 * @returns {null} 返回得到的Vue实例对象，如果Vue实例对象为空，则异常
 */
function getContext() {
    if (context === null) {
        throw new Error("得到Vue实例失败，请重新获取");
    }
    return context;
}

export default {
    setContext,
    getContext
};