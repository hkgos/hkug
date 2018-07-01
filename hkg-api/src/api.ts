import axios from 'axios';
import { Convert, ThreadContent, Login, Userinfo, TopicList} from './model';
import { MD5 } from 'crypto-js';
import { URLSearchParams } from 'url';

export interface HKG {
    login(request: LoginRequest): Promise<any>;
    getThreadContent(request: RepliesRequest): Promise<ThreadContent>;
    getTopicList(request: TopicListRequest): Promise<TopicList>;
    getVersion(): Promise<any>;
}

export interface LoginRequest {
    username: string,
    pass: string,
}
export interface RepliesRequest {
    message: string,
    page: number,
}
export interface TopicListRequest {
    type: string,
    page: number,
}

export interface HKGConfig {
    baseURL? : string
}

const defaultBaseURL = 'https://api-1.hkgolden.com/';

const getFormData = function (request) {
    return new URLSearchParams(Object.entries(request)).toString().replace(new RegExp('\\+', 'g'), '%20');
};

export function create(config?: HKGConfig): Promise<HKG> {
    const configWithDefault: HKGConfig = {
        baseURL: defaultBaseURL,
        ...config
    };
    const instance = axios.create({
        baseURL: configWithDefault.baseURL,
        transformResponse: req => req
    });
    const dateFormat = new Intl.DateTimeFormat("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" });
    let userInfo: Userinfo = undefined;
    let passwordHashed: string = undefined;
    const getApiGeneralKey = function (userId?: string): string {
        const dateString = dateFormat.formatToParts(new Date()).reduce((acc, cur) => cur.type != 'literal' ? acc + cur.value : acc, "");
        const userIdDefault = userId === undefined ? '%GUEST%' : userId;
        return MD5(`${dateString}_HKGOLDEN_${userIdDefault}_$API#Android_1_2^`).toString();
    };
    const getApiTopicDetailsKey = function (thread: string, page: number, userId?: string): string {
        const dateString = dateFormat.formatToParts(new Date()).reduce((acc, cur) => cur.type != 'literal' ? acc + cur.value : acc, "");
        const limit = 25;
        const start = (page - 1) * limit;
        const filter = 'N';
        const userIdDefault = userId === undefined ? '%GUEST%' : userId;
        return MD5(`${dateString}_HKGOLDEN_${userIdDefault}_$API#Android_1_2^${thread}_${start}_${filter}_N`).toString();
    };
    const getApiTopicsListKey = function (type: string, page: number, userId?: string): string {
        const dateString = dateFormat.formatToParts(new Date()).reduce((acc, cur) => cur.type != 'literal' ? acc + cur.value : acc, "");
        const userIdDefault = userId === undefined ? '%GUEST%' : userId;
        const filter = 'N';
        return MD5(`${dateString}_HKGOLDEN_${userIdDefault}_$API#Android_1_2^${type}_${page}_${filter}_N`).toString();
    };
    const handleLogin = function(loginResponse: Login) : Login {
        if (loginResponse.success) {
            userInfo = loginResponse.userinfo;
        } else {
            userInfo = undefined;
        }
        return loginResponse;
    };
    const getLoginParam = function() {
        return userInfo === undefined ? {user_id: '0', pass: ''} : {user_id: userInfo.id_key.toString(), pass: passwordHashed};
    };
    const apiEndPoint: HKG = {
        login: request => {
            passwordHashed = MD5(request.pass).toString();
            return instance.post('login.aspx', getFormData({
                s: getApiGeneralKey(),
                username: request.username,
                pass: passwordHashed,
                returntype: 'json'
            })).then(response => handleLogin(Convert.toLogin(response.data)));
        },
        getThreadContent: request =>
            instance.get('newView.aspx?' + new URLSearchParams(Object.entries({
                s: getApiTopicDetailsKey(request.message, request.page, userInfo !== undefined ? userInfo.id_key.toString(): undefined),
                message: request.message,
                page: request.page.toString(),
                ...getLoginParam(),
                block: 'Y',
                sensormode: 'N',
                filterMode: 'N',
                returntype: 'json'
            }))).then(response => Convert.toThreadContent(response.data)),
        getTopicList: request => 
            instance.get('topics.aspx?' + + new URLSearchParams(Object.entries({
                s: getApiTopicsListKey(request.type, request.page, userInfo !== undefined ? userInfo.id_key.toString(): undefined),
                type: request.type,
                page: request.page.toString(),
                pagesize: '50',
                ...getLoginParam(),
                block: 'Y',
                sensormode: 'N',
                filterMode: 'N',
                hotOnly: 'N',
                returntype: 'json'
            }))).then(response => Convert.toTopicList(response.data)),
        getVersion: () => {
            const test = {
                s: getApiGeneralKey(),
                user_id: '0',
                returntype: 'json'
            };
            return instance.get('version.aspx?' + new URLSearchParams(Object.entries(test)));
        }
    };
    return Promise.resolve(apiEndPoint);
}