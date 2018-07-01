"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const model_1 = require("./model");
const crypto_js_1 = require("crypto-js");
const url_1 = require("url");
const defaultBaseURL = 'https://api-1.hkgolden.com/';
const getFormData = function (request) {
    return new url_1.URLSearchParams(Object.entries(request)).toString().replace(new RegExp('\\+', 'g'), '%20');
};
function create(config) {
    const configWithDefault = Object.assign({ baseURL: defaultBaseURL }, config);
    const instance = axios_1.default.create({
        baseURL: configWithDefault.baseURL,
        transformResponse: req => req
    });
    const dateFormat = new Intl.DateTimeFormat("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" });
    let userInfo = undefined;
    let passwordHashed = undefined;
    const getApiGeneralKey = function (userId) {
        const dateString = dateFormat.formatToParts(new Date()).reduce((acc, cur) => cur.type != 'literal' ? acc + cur.value : acc, "");
        const userIdDefault = userId === undefined ? '%GUEST%' : userId;
        return crypto_js_1.MD5(`${dateString}_HKGOLDEN_${userIdDefault}_$API#Android_1_2^`).toString();
    };
    const getApiTopicDetailsKey = function (thread, page, userId) {
        const dateString = dateFormat.formatToParts(new Date()).reduce((acc, cur) => cur.type != 'literal' ? acc + cur.value : acc, "");
        const limit = 25;
        const start = (page - 1) * limit;
        const filter = 'N';
        const userIdDefault = userId === undefined ? '%GUEST%' : userId;
        return crypto_js_1.MD5(`${dateString}_HKGOLDEN_${userIdDefault}_$API#Android_1_2^${thread}_${start}_${filter}_N`).toString();
    };
    const getApiTopicsListKey = function (type, page, userId) {
        const dateString = dateFormat.formatToParts(new Date()).reduce((acc, cur) => cur.type != 'literal' ? acc + cur.value : acc, "");
        const userIdDefault = userId === undefined ? '%GUEST%' : userId;
        const filter = 'N';
        return crypto_js_1.MD5(`${dateString}_HKGOLDEN_${userIdDefault}_$API#Android_1_2^${type}_${page}_${filter}_N`).toString();
    };
    const handleLogin = function (loginResponse) {
        if (loginResponse.success) {
            userInfo = loginResponse.userinfo;
        }
        else {
            userInfo = undefined;
        }
        return loginResponse;
    };
    const getLoginParam = function () {
        return userInfo === undefined ? { user_id: '0', pass: '' } : { user_id: userInfo.id_key.toString(), pass: passwordHashed };
    };
    const apiEndPoint = {
        login: request => {
            passwordHashed = crypto_js_1.MD5(request.pass).toString();
            return instance.post('login.aspx', getFormData({
                s: getApiGeneralKey(),
                username: request.username,
                pass: passwordHashed,
                returntype: 'json'
            })).then(response => handleLogin(model_1.Convert.toLogin(response.data)));
        },
        getThreadContent: request => instance.get('newView.aspx?' + new url_1.URLSearchParams(Object.entries(Object.assign({ s: getApiTopicDetailsKey(request.message, request.page, userInfo !== undefined ? userInfo.id_key.toString() : undefined), message: request.message, page: request.page.toString() }, getLoginParam(), { block: 'Y', sensormode: 'N', filterMode: 'N', returntype: 'json' })))).then(response => model_1.Convert.toThreadContent(response.data)),
        getTopicList: request => instance.get('topics.aspx?' + new url_1.URLSearchParams(Object.entries(Object.assign({ s: getApiTopicsListKey(request.type, request.page, userInfo !== undefined ? userInfo.id_key.toString() : undefined), type: request.type, page: request.page.toString(), pagesize: '50' }, getLoginParam(), { block: 'Y', sensormode: 'N', filterMode: 'N', hotOnly: 'N', returntype: 'json' })))).then(response => model_1.Convert.toTopicList(response.data)),
        getVersion: () => {
            const test = {
                s: getApiGeneralKey(),
                user_id: '0',
                returntype: 'json'
            };
            return instance.get('version.aspx?' + new url_1.URLSearchParams(Object.entries(test)));
        },
        reply: request => instance.post('post.aspx', getFormData(Object.assign({ s: getApiGeneralKey(userInfo.id_key.toString()), mt: 'Y', id: request.message, body: request.body }, getLoginParam(), { returntype: 'json' }))).then(response => model_1.Convert.toReply(response.data)),
        newThread: request => instance.post('post.aspx', getFormData(Object.assign({ s: getApiGeneralKey(userInfo.id_key.toString()), mt: 'N', ft: request.topicType, title: request.title, body: request.body }, getLoginParam(), { returntype: 'json' }))).then(response => model_1.Convert.toReply(response.data))
    };
    return Promise.resolve(apiEndPoint);
}
exports.create = create;
//# sourceMappingURL=api.js.map