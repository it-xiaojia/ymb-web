// 封装axios
import axios from "axios";
import init from "@/api/init";

const httpStatus = {
    OK: 200,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
}

const businessStatus = {
    SUCCESS: 200,
    FORBIDDEN: 403,
    FAIL: 404,
}

const responseCode = {
    REQUEST_TIMEOUT: "ECONNABORTED",
    NO_RESPONSE: "ERR_NETWORK"
}

/**
 * 根据配置文件自动选择对应的环境URL
 */
console.log("当前环境：", process.env.VUE_APP_ENV_DESC);
console.log("URL：", process.env.VUE_APP_BASE_URL);
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

/**
 * 设置超时时间
 */
axios.defaults.timeout = 10000;

/**
 * 设置响应拦截器
 */
axios.interceptors.response.use(response => {
    // 成功后将数据响应回去
    return response.data;
}, error => {
    let context = init.getContext();
    switch (error.code) {
        case responseCode.REQUEST_TIMEOUT:
            context.$message.error("请求超时");
            break;
        case responseCode.NO_RESPONSE:
            context.$message.error("服务器无响应");
            break;
    }
    let {response} = error;
    if (response) {
        // 根据服务器的错误返回结果执行不同的操作
        switch (response.status) {
            case httpStatus.NOT_FOUND:
                // 去404页面
                console.log("请求的资源不存在，去404页面");
                break;
            case httpStatus.INTERNAL_SERVER_ERROR:
                console.log(error);
                context.$message.error("发生了点小意外，清稍后重试");
                break;
        }
    } else {
        // 服务器无结果返回
        if (!window.navigator.onLine) {
            // 断网处理
            console.log("网络连接中断，去断网页面");
        }
        return Promise.reject(error);
    }
});

/**
 * 通用的请求方法
 *
 * @param method 请求方法
 * @param url 请求URL
 * @param params 参数
 * @param successMessage 成功消息，如果不为空，则只显示成功提示消息
 * @param successCallBack 成功的回调函数-有数据携带
 * @param failMessage 失败消息，如果不为空，则只显示失败消息
 * @param failCallBack 失败的回调函数-没有数据携带
 */
function request(method, url, params, successMessage, successCallBack, failMessage, failCallBack) {
    let context = init.getContext();
    axios({
        method: method,
        url: url,
        data: params
    }).then(res => {
        if (res !== undefined) {
            switch (res.code) {
                // 请求成功
                case businessStatus.SUCCESS:
                    if (context.$util.isStringNotNull(successMessage)) {
                        context.$message.success(successMessage);
                    } else {
                        successCallBack(res.data);
                    }
                    break;
                // 请求失败
                case businessStatus.FAIL:
                    if (context.$util.isStringNotNull(failMessage)) {
                        context.$message.warning(failMessage);
                    } else {
                        console.log("请求失败，原因：", res);
                        failCallBack();
                    }
                    break;
            }
        }
    });
}

export default {
    request
};