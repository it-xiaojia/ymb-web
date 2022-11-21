// 文章API接口封装
import http from "@/api/http";
import init from "@/api/init";

/**
 * 根据传入的action生成url
 *
 * @param action 传入的action
 * @returns {string} 返回url
 */
function generateUrl(action) {
    return "/article/" + action;
}

/**
 * 获取文章列表
 *
 * @param queryParam 查询参数
 * @param successCallBack 成功的回调
 */
function getArticleList(queryParam, successCallBack) {
    let context = init.getContext();
    http.request(context.$common.REQUEST_METHOD.POST,
        generateUrl("getArticleList"),
        queryParam,
        null,
        successCallBack,
        "博客列表获取失败",
        null);
}

function getArticle(queryParam, successCallBack) {
    let context = init.getContext();
    http.request(context.$common.REQUEST_METHOD.POST,
        generateUrl("getArticle"),
        queryParam,
        null,
        successCallBack,
        "没有此博客信息",
        null);
}

export default {
    getArticleList,
    getArticle
}