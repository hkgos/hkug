export interface GeneralJson {
    error_code: string;
    error_message?: string;
    server_time: number;
    success: number;
}
export interface BlockedUserJSON extends GeneralJson {
    response: BlockUserResponse;
}
export interface BlockUserResponse {
    blocked_user_list: User[];
    me: Me;
}
export interface User {
    user_id: string;
    nickname: string;
    level: string;
    gender: Gender;
    status: string;
    create_time: number;
    level_name: LevelName;
    is_following: boolean;
    is_blocked: boolean;
    is_disappear: boolean;
    blocked_time?: number;
}
export declare enum Gender {
    F = "F",
    M = "M"
}
export declare enum LevelName {
    普通會員 = "\u666E\u901A\u6703\u54E1"
}
export interface Me {
    user_id: string;
    nickname: string;
    email: string;
    level: string;
    gender: Gender;
    status: string;
    plus_expiry_time: number;
    create_time: number;
    last_login_time: number;
    level_name: LevelName;
    is_disappear: boolean;
    is_plus_user: boolean;
    meta_data: MetaData;
}
export interface MetaData {
    custom_cat: string[];
    keyword_filter: string;
    login_count: number;
    last_read_notify_time: number;
    notify_count: number;
    push_setting: PushSetting;
}
export interface PushSetting {
    all: boolean;
    show_preview: boolean;
    new_reply: boolean;
    quote: boolean;
    following_new_thread: boolean;
}
export interface ContentJSON extends GeneralJson {
    response: Thread;
}
export interface Thread {
    thread_id: string;
    cat_id: string;
    sub_cat_id: string;
    title: string;
    user_id?: string;
    user_nickname: string;
    user_gender: Gender;
    no_of_reply: string;
    no_of_uni_user_reply: string;
    like_count: string;
    dislike_count: string;
    reply_like_count: string;
    reply_dislike_count: string;
    max_reply_like_count: string;
    max_reply_dislike_count: string;
    create_time: number;
    last_reply_time: number;
    last_reply_time_order?: number;
    status: string;
    remark: ContentResponseRemark;
    last_reply_user_id: string;
    first_post_id?: string;
    last_post_id?: string;
    most_like_post_id?: string;
    max_reply: string;
    total_page: number;
    is_adu: boolean;
    category: Category;
    is_bookmarked: boolean;
    is_replied: boolean;
    last_read?: LastRead;
    user: User;
    page?: string;
    item_data?: Post[];
    me?: Me;
    is_hot?: boolean;
    sub_category?: ContentResponseSubCategory;
}
export interface Category {
    cat_id: string;
    name: string;
    postable: boolean;
}
export interface Post {
    post_id: string;
    quote_post_id: string;
    thread_id: string;
    user_nickname: string;
    user_gender: Gender;
    like_count: string;
    dislike_count: string;
    vote_score: string;
    no_of_quote: string;
    status: string;
    reply_time: number;
    msg: string;
    user: User;
    page: number;
    msg_num: number;
    quote?: Post;
}
export interface LastRead {
    page: string;
    post_id: number;
    no_of_reply: string;
}
export interface ContentResponseRemark {
    last_reply_count: number;
}
export interface ContentResponseSubCategory {
    sub_cat_id: string;
    cat_id: string;
    name: string;
    postable: boolean;
    filterable: boolean;
    orderable: boolean;
    is_filter: boolean;
    url: string;
    query: CategoryQuery;
}
export interface Emoji {
    cat: string;
    icons: Array<string[]>;
    special?: Array<string[]>;
    show_on?: ShowOn;
    pin_top?: boolean;
}
export interface ShowOn {
    start_time?: number;
    end_time?: number;
    user_id?: number[];
    cat_id?: any[];
}
export interface FollowingUserJSON extends GeneralJson {
    response: FollowingUserResponse;
}
export interface FollowingUserResponse {
    is_pagination: boolean;
    items: Thread[];
    me: Me;
}
export interface ItemRemark {
    last_reply_count: number;
    _?: number;
}
export declare enum UserGender {
    M = "M",
    F = "F"
}
export interface ImagesListJSON extends GeneralJson {
    response: ImagesResponse;
}
export interface ImagesResponse {
    thread_id: string;
    title: string;
    images: Image[];
    me: Me;
}
export interface Image {
    page: number;
    msg_num: number;
    post_id: string;
    type: string;
    url: string;
    is_no_cache: boolean;
}
export interface LikeJSON {
    success: number;
    server_time: number;
    error_code?: number;
    error_message?: string;
    response?: LikeReponse;
}
export interface LikeReponse {
    thread: Thread;
    is_like: boolean;
    me: Me;
}
export interface LoginJSON extends GeneralJson {
    response: LoginResponse;
}
export interface LoginResponse {
    token: string;
    keyword_filter_list: any[];
    category_order: any[];
    user: Me;
    fixed_category_list: FixedCategoryList[];
    me: Me;
}
export interface FixedCategoryList {
    name: Name;
    cat_list: Category[];
}
export interface Category {
    cat_id: string;
    name: string;
    postable: boolean;
    type: CategoryListType;
    url: URL;
    query: CategoryQuery;
    sub_category: SubCategory[];
}
export interface SubCategory {
    cat_id: string;
    sub_cat_id: number | string;
    name: string;
    postable: boolean;
    filterable: boolean;
    orderable: boolean;
    is_filter: boolean;
    url: URL;
    query: CategoryQuery;
}
export interface CategoryQuery {
    order?: Order;
    type?: QueryType;
    cat_id?: string;
    sub_cat_id?: string;
}
export declare enum Order {
    Hot = "hot"
}
export declare enum QueryType {
    Now = "now",
    Daily = "daily",
    Weekly = "weekly"
}
export declare enum URL {
    HTTPSLihkgCOMAPIV2ThreadCategory = "https://lihkg.com/api_v2/thread/category",
    HTTPSLihkgCOMAPIV2ThreadCustom = "https://lihkg.com/api_v2/thread/custom",
    HTTPSLihkgCOMAPIV2ThreadHot = "https://lihkg.com/api_v2/thread/hot",
    HTTPSLihkgCOMAPIV2ThreadLatest = "https://lihkg.com/api_v2/thread/latest",
    HTTPSLihkgCOMAPIV2ThreadNews = "https://lihkg.com/api_v2/thread/news"
}
export declare enum CategoryListType {
    Hkg = "hkg"
}
export declare enum Name {
    Empty = "",
    其他 = "\u5176\u4ED6",
    新聞 = "\u65B0\u805E",
    生活 = "\u751F\u6D3B",
    科技 = "\u79D1\u6280",
    興趣 = "\u8208\u8DA3"
}
export interface ProfileJSON extends GeneralJson {
    response: ProfileResponse;
}
export interface ProfileResponse {
    user: User;
    me: Me;
}
export interface PropertyJSON extends GeneralJson {
    response: PropertyResponse;
}
export interface PropertyResponse {
    lihkg: boolean;
    category_list: Category[];
    fixed_category_list: FixedCategoryList[];
    config: Config;
    keyword_filter_list?: any[];
    category_order?: any[];
    me?: Me;
}
export interface Config {
    flurry_fix: boolean;
    preload: boolean;
    hot_interval: number;
    request_timeout: number;
    ad_start_count: number;
    ad_interval_count: number;
    native: ConfigNative;
    banner: ConfigBanner;
    native_popup: NativePopup;
    popup: Browser;
    native_banner: ConfigNativeBanner;
    browser: Browser;
    pm: Pm;
    pm_reply: PmReply;
    video: PmReply;
    adult_ad: boolean;
    dc: number;
    ds: number;
    dd: number;
    dm: boolean;
    pri: number;
    maxpin: number;
    sni: number;
    pemsg: string;
    f_startTime: number;
    f_endTime: number;
    f_fadeInTime: number;
    f_fadeOutTime: number;
    f_appearTime: number;
    f_interval: number;
    ios: Ios;
    android: Android;
}
export interface Android {
    dv: boolean;
    pri: number;
    maxpin: number;
    native_banner: AndroidNativeBanner;
    banner: AndroidBanner;
    native: AndroidNative;
}
export interface AndroidBanner {
    facebook: Facebook;
    flurry: Facebook;
    admob: Facebook;
}
export interface Facebook {
    backfill: number[];
}
export interface AndroidNative {
    preload: Preload1;
}
export interface Preload1 {
    interval: number;
    flurry_banner: number;
    fb_banner: number;
}
export interface AndroidNativeBanner {
    facebook: number;
    flurry: number;
}
export interface ConfigBanner {
    facebook: Facebook;
    flurry: Facebook;
}
export interface Browser {
    native: number;
    dfp: number;
}
export interface Ios {
    dv: boolean;
}
export interface ConfigNative {
    preload: Preload2;
}
export interface Preload2 {
    flurry_banner: number;
    flurry_popup: number;
    fb_banner: number;
    fb_popup: number;
    admob_native: number;
    interval: number;
}
export interface ConfigNativeBanner {
    facebook: number;
    flurry: number;
    admob: number;
}
export interface NativePopup {
    rate: number;
    max: number;
    facebook: number;
    flurry: number;
    admob: number;
    admob_native: number;
    admob_max: number;
}
export interface Pm {
    popup: Popup;
}
export interface Popup {
    ad_interval_count: number;
}
export interface PmReply {
    rate: number;
}
export interface TopicListJSON {
    success: number;
    server_time: number;
    response: Response;
}
export interface Response {
    category: Category;
    is_pagination: boolean;
    items: Thread[];
    me?: Me;
}
export declare namespace Convert {
    function toBlockedUserJSON(json: string): BlockedUserJSON;
    function blockedUserJSONToJson(value: BlockedUserJSON): string;
    function toBlockUserResponse(json: string): BlockUserResponse;
    function blockUserResponseToJson(value: BlockUserResponse): string;
    function toContentJSON(json: string): ContentJSON;
    function contentJSONToJson(value: ContentJSON): string;
    function toContentResponse(json: string): Thread;
    function contentResponseToJson(value: Thread): string;
    function toEmoji(json: string): Emoji;
    function emojiToJson(value: Emoji): string;
    function toEmojis(json: string): Emoji[];
    function emojisToJson(value: Emoji[]): string;
    function toFollowingUserJSON(json: string): FollowingUserJSON;
    function followingUserJSONToJson(value: FollowingUserJSON): string;
    function toFollowingUserResponse(json: string): FollowingUserResponse;
    function followingUserResponseToJson(value: FollowingUserResponse): string;
    function toImagesListJSON(json: string): ImagesListJSON;
    function imagesListJSONToJson(value: ImagesListJSON): string;
    function toImagesResponse(json: string): ImagesResponse;
    function imagesResponseToJson(value: ImagesResponse): string;
    function toLikeJSON(json: string): LikeJSON;
    function likeJSONToJson(value: LikeJSON): string;
    function toLikeReponse(json: string): LikeReponse;
    function likeReponseToJson(value: LikeReponse): string;
    function toLoginJSON(json: string): LoginJSON;
    function loginJSONToJson(value: LoginJSON): string;
    function toLoginResponse(json: string): LoginResponse;
    function loginResponseToJson(value: LoginResponse): string;
    function toPost(json: string): Post;
    function postToJson(value: Post): string;
    function toProfileJSON(json: string): ProfileJSON;
    function profileJSONToJson(value: ProfileJSON): string;
    function toProfileResponse(json: string): ProfileResponse;
    function profileResponseToJson(value: ProfileResponse): string;
    function toPropertyJSON(json: string): PropertyJSON;
    function propertyJSONToJson(value: PropertyJSON): string;
    function toPropertyResponse(json: string): PropertyResponse;
    function propertyResponseToJson(value: PropertyResponse): string;
    function toThread(json: string): Thread;
    function threadToJson(value: Thread): string;
    function toTopicListJSON(json: string): TopicListJSON;
    function topicListJSONToJson(value: TopicListJSON): string;
}
