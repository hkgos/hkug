import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Convert, PropertyJSON, Emoji, LoginJSON, TopicListJSON, ContentJSON, ImagesListJSON, LikeJSON, Category, ProfileJSON, BlockedUserJSON, FollowingUserJSON, QueryType} from './model';
import { v4 as uuidv4 } from 'uuid';
import { SHA1, enc } from 'crypto-js';
import { URLSearchParams } from 'url';

const defaultBaseURL = 'https://lihkg.com/api_v2/';
export interface LIHKG {
    getProperty(): Promise<PropertyJSON>;
    login(request: LoginRequest): Promise<LoginJSON>;
    getTopicList(request: TopicListRequest): Promise<TopicListJSON>;
    getTopicListByThreadId(threadIds: String[]);
    getThreadContent(request: ThreadContentRequest): Promise<ContentJSON>;
    reply(request: ReplyRequest): Promise<any>;
    getThreadMedia(request: ThreadMediaRequest): Promise<ImagesListJSON>;
    likeThread(request: LikeThreadRequest): Promise<LikeJSON>;
    likePost(request: LikePostRequest): Promise<any>;
    getBookmark(request: BookmarkRequest): Promise<TopicListJSON>;
    getProfile(request: ProfileRequest): Promise<ProfileJSON>;
    getBlockedUser(): Promise<BlockedUserJSON>;
    getFollowingUser(): Promise<FollowingUserJSON>;
    search(request: SearchRequest): Promise<TopicListJSON>;
}

export enum PostOrder {
    replyTime = 'reply_time',
    score = 'score'
}

export enum ThreadSearchOrder {
    score = 'score',
    descCreateTime = 'desc_create_time',
    descReplyTime = 'desc_reply_time',
}

export enum ThreadMediaIncludeLink {
    Yes = '1',
    No = '0'
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface BookmarkRequest {
    page: number,
}

export interface ProfileRequest {
    user_id: number,
}
export interface ThreadMediaRequest {
    thread_id: number,
    include_link: ThreadMediaIncludeLink
}



export interface TopicListRequest {
    cat_id: string,
    sub_cat_id: number,
    page: number,
    count: number,
}

export interface ThreadContentRequest {
    thread_id: number,
    page: number,
    order: PostOrder,
}

export interface ReplyRequest {
    thread_id: number,
    content: string,
}

export interface LikeThreadRequest {
    thread_id: number,
    like: boolean
}

export interface LikePostRequest {
    thread_id: number,
    post_id: string,
    like: boolean,
}

export interface SearchRequest {
    q: string,
    sort: ThreadSearchOrder,
    page: number,
    count: number,
    cat_id?: number,
    sub_cat_id?: number
}

export function getEmoji() {
    return axios
        .get('https://x.lihkg.com/hkgmoji.json', {transformResponse: req => req})
        .then(response => Convert.toEmojis(response.data));
};

export function create(baseURL = 'defaultBaseURL'): Promise<LIHKG> {
    let device = enc.Hex.stringify(SHA1(uuidv4()));
    let instance = axios.create({
        headers: {
            'X-LI-DEVICE': device,
            'X-LI-DEVICE-TYPE': 'android',
            'User-Agent': 'LIHKG/16.0.4 Android/9.0.0 Google/Pixel XL',
            'orginal': 'https://lihkg.com',
            'referer': 'https://lihkg.com/category/1',
        },
        baseURL: baseURL,
        transformResponse: req => req
    });
    let token = '';
    let login = false;
    let initProperty = false;
    let property: Category[];
    const apiEndPoint: LIHKG = {
        getProperty: () =>
            instance
                .get('system/property')
                .then(response => {
                    const propertyJson = Convert.toPropertyJSON(response.data);
                    property = propertyJson.response.category_list;
                    return propertyJson;
                }),
        login: (request) =>
            instance
                .post('auth/login', new URLSearchParams(Object.entries(request)).toString())
                .then(function (response) {
                    let loginJson = Convert.toLoginJSON(response.data);
                    if (loginJson.success) {
                        token = loginJson.response.token;
                        login = true;
                        instance.defaults.headers.common['X-LI-USER'] = loginJson.response.user.user_id;
                    }
                    return loginJson;
                }),
        getTopicList: request => {
            const category = property.find(element => element.cat_id == request.cat_id);
            if (category === undefined) {
                return Promise.reject(new Error('invalid category id'));
            }
            const subCategory = category.sub_category.find(element => element.sub_cat_id == request.sub_cat_id);
            if (subCategory === undefined) {
                return Promise.reject(new Error('invalid sub category id'));
            }
            let query = {
                cat_id: request.cat_id.toString(),
                page: request.page.toString(),
                count: request.count.toString(),
                type: QueryType.Now,
                ...subCategory.query,
            };
            return instance
                .get(subCategory.url.replace(defaultBaseURL, '') + '?' + new URLSearchParams(Object.entries(query)).toString())
                .then(response => Convert.toTopicListJSON(response.data));
        },
        getTopicListByThreadId: threadIds => 
            instance
                .get(`thread?thread_ids=[${threadIds.join(',')}]`)
                .then(response => Convert.toTopicListJSON(response.data)),
        getThreadContent: request =>
            instance
                .get(`thread/${request.thread_id}/page/${request.page}?order=${request.order}`)
                .then(response => Convert.toContentJSON(response.data)),
        reply: request =>
            instance
                .post('thread/reply', new URLSearchParams(Object.entries(request)).toString())
                .then(response => JSON.parse(response.data)),
        getThreadMedia: request =>
            instance
                .get(`thread/${request.thread_id}/media?` + new URLSearchParams(Object.entries(request)).toString())
                .then(response => Convert.toImagesListJSON(response.data)),
        likeThread: request =>
            instance
                .post(`thread/${request.thread_id}/${request.like?'like':'dislike'}`)
                .then(response => Convert.toLikeJSON(response.data)),
        likePost: request =>
            instance
                .post(`thread/${request.thread_id}/${request.post_id}/${request.like?'like':'dislike'}`)
                .then(response => JSON.parse(response.data)),
        getBookmark: request =>
            instance
                .get('thread/bookmark?' + new URLSearchParams(Object.entries(request)).toString())
                .then(response => Convert.toTopicListJSON(response.data)),
        getProfile: request =>
            instance
                .get(`user/${request.user_id}/profile`)
                .then(response => Convert.toProfileJSON(response.data)),
        getBlockedUser: () =>
            instance
                .get('me/blocked-user')
                .then(response => Convert.toBlockedUserJSON(response.data)),
        getFollowingUser: () =>
            instance
                .get('me/following-user')
                .then(response => Convert.toFollowingUserJSON(response.data)),
        search: request => 
            instance
                .get('thread/search?' + new URLSearchParams(Object.entries(request)).toString())
                .then(response => Convert.toTopicListJSON(response.data)),
    };
    const injectAxiosRequestConfig = function(config: AxiosRequestConfig): AxiosRequestConfig{
        if (login) {
            const timeStamp = Math.floor(Date.now() / 1000);
            const digest = (config.method == 'get')
                ? enc.Hex.stringify(SHA1(['jeams', config.method, config.baseURL + config.url.replace('[', '%5b').replace(']', '%5d').replace(',', '%2c'), config.data, token, timeStamp].join('$')))
                : enc.Hex.stringify(SHA1(['jeams', config.method, config.baseURL + config.url, config.data, token, timeStamp].join('$')));
            const newConfig = {
                ...config,
                headers: {
                    ...config.headers,
                    'X-LI-REQUEST-TIME': timeStamp,
                    'X-LI-DIGEST': digest
                }
            };
            console.log(newConfig);
            return newConfig;
        } else {
            console.log(config);
            return config;
        }
    };
    instance.interceptors.request.use((config) => {
        if (initProperty) {
            initProperty = false;
            return apiEndPoint
                .getProperty()
                .then(response => injectAxiosRequestConfig(config));
        } else {
            return injectAxiosRequestConfig(config);
        }
    });
    instance.interceptors.response.use(response => {
        console.log(JSON.parse(response.data));
        return response;
    });
    return apiEndPoint.getProperty().then(()=> apiEndPoint);
}