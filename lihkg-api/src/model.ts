export interface GeneralJson {
    error_code: string,
    error_message?: string,
    server_time: number,
    success: number,
}

export interface BlockedUserJSON extends GeneralJson{
    response:    BlockUserResponse;
}

export interface BlockUserResponse {
    blocked_user_list: User[];
    me:                Me;
}

export interface User {
    user_id:       string;
    nickname:      string;
    level:         string;
    gender:        Gender;
    status:        string;
    create_time:   number;
    level_name:    LevelName;
    is_following:  boolean;
    is_blocked:    boolean;
    is_disappear:  boolean;
    blocked_time?: number;
}

export enum Gender {
    F = "F",
    M = "M",
}

export enum LevelName {
    普通會員 = "普通會員",
}

export interface Me {
    user_id:          string;
    nickname:         string;
    email:            string;
    level:            string;
    gender:           Gender;
    status:           string;
    plus_expiry_time: number;
    create_time:      number;
    last_login_time:  number;
    level_name:       LevelName;
    is_disappear:     boolean;
    is_plus_user:     boolean;
    meta_data:        MetaData;
}

export interface MetaData {
    custom_cat:            string[];
    keyword_filter:        string;
    login_count:           number;
    last_read_notify_time: number;
    notify_count:          number;
    push_setting:          PushSetting;
}

export interface PushSetting {
    all:                  boolean;
    show_preview:         boolean;
    new_reply:            boolean;
    quote:                boolean;
    following_new_thread: boolean;
}

export interface ContentJSON extends GeneralJson {
    response:    Thread;
}

export interface Thread {
    thread_id:               string;
    cat_id:                  string;
    sub_cat_id:              string;
    title:                   string;
    user_id?:                string;
    user_nickname:           string;
    user_gender:             Gender;
    no_of_reply:             string;
    no_of_uni_user_reply:    string;
    like_count:              string;
    dislike_count:           string;
    reply_like_count:        string;
    reply_dislike_count:     string;
    max_reply_like_count:    string;
    max_reply_dislike_count: string;
    create_time:             number;
    last_reply_time:         number;
    last_reply_time_order?:  number;
    status:                  string;
    remark:                  ContentResponseRemark;
    last_reply_user_id:      string;
    first_post_id?:          string;
    last_post_id?:           string;
    most_like_post_id?:      string;
    max_reply:               string;
    total_page:              number;
    is_adu:                  boolean;
    category:                Category;
    is_bookmarked:           boolean;
    is_replied:              boolean;
    last_read?:              LastRead;
    user:                    User;
    page?:                   string;
    item_data?:              Post[];
    me?:                     Me;
    is_hot?:                 boolean;
    sub_category?:           ContentResponseSubCategory;
}

export interface Category {
    cat_id:   string;
    name:     string;
    postable: boolean;
}

export interface Post {
    post_id:       string;
    quote_post_id: string;
    thread_id:     string;
    user_nickname: string;
    user_gender:   Gender;
    like_count:    string;
    dislike_count: string;
    vote_score:    string;
    no_of_quote:   string;
    status:        string;
    reply_time:    number;
    msg:           string;
    user:          User;
    page:          number;
    msg_num:       number;
    quote?:        Post;
}

export interface LastRead {
    page:        string;
    post_id:     number;
    no_of_reply: string;
}

export interface ContentResponseRemark {
    last_reply_count: number;
}

export interface ContentResponseSubCategory {
    sub_cat_id: string;
    cat_id:     string;
    name:       string;
    postable:   boolean;
    filterable: boolean;
    orderable:  boolean;
    is_filter:  boolean;
    url:        string;
    query:      CategoryQuery;
}

export interface Emoji {
    cat:      string;
    icons:    Array<string[]>;
    special?: Array<string[]>;
    show_on?: ShowOn;
    pin_top?: boolean;
}

export interface ShowOn {
    start_time?: number;
    end_time?:   number;
    user_id?:    number[];
    cat_id?:     any[];
}

export interface FollowingUserJSON extends GeneralJson{
    response:    FollowingUserResponse;
}

export interface FollowingUserResponse {
    is_pagination: boolean;
    items:         Thread[];
    me:            Me;
}

export interface ItemRemark {
    last_reply_count: number;
    _?:               number;
}

export enum UserGender {
    M = "M",
    F = "F"
}

export interface ImagesListJSON extends GeneralJson{
    response:    ImagesResponse;
}

export interface ImagesResponse {
    thread_id: string;
    title:     string;
    images:    Image[];
    me:        Me;
}

export interface Image {
    page:        number;
    msg_num:     number;
    post_id:     string;
    type:        string;
    url:         string;
    is_no_cache: boolean;
}

export interface LikeJSON {
    success:        number;
    server_time:    number;
    error_code?:    number;
    error_message?: string;
    response?:      LikeReponse;
}

export interface LikeReponse {
    thread:  Thread;
    is_like: boolean;
    me:      Me;
}

export interface LoginJSON extends GeneralJson{
    response:    LoginResponse;
}

export interface LoginResponse {
    token:               string;
    keyword_filter_list: any[];
    category_order:      any[];
    user:                Me;
    fixed_category_list: FixedCategoryList[];
    me:                  Me;
}

export interface FixedCategoryList {
    name:     Name;
    cat_list: Category[];
}

export interface Category {
    cat_id:       string;
    name:         string;
    postable:     boolean;
    type:         CategoryListType;
    url:          URL;
    query:        CategoryQuery;
    sub_category: SubCategory[];
}

export interface SubCategory {
    cat_id:     string;
    sub_cat_id: number | string;
    name:       string;
    postable:   boolean;
    filterable: boolean;
    orderable:  boolean;
    is_filter:  boolean;
    url:        URL;
    query:      CategoryQuery;
}

export interface CategoryQuery {
    order?:      Order;
    type?:       QueryType;
    cat_id?:     string;
    sub_cat_id?: string;
}

export enum Order {
    Hot = "hot",
}

export enum QueryType {
    Now = "now",
    Daily = "daily",
    Weekly = "weekly",
}

export enum URL {
    HTTPSLihkgCOMAPIV2ThreadCategory = "https://lihkg.com/api_v2/thread/category",
    HTTPSLihkgCOMAPIV2ThreadCustom = "https://lihkg.com/api_v2/thread/custom",
    HTTPSLihkgCOMAPIV2ThreadHot = "https://lihkg.com/api_v2/thread/hot",
    HTTPSLihkgCOMAPIV2ThreadLatest = "https://lihkg.com/api_v2/thread/latest",
    HTTPSLihkgCOMAPIV2ThreadNews = "https://lihkg.com/api_v2/thread/news",
}

export enum CategoryListType {
    Hkg = "hkg",
}

export enum Name {
    Empty = "",
    其他 = "其他",
    新聞 = "新聞",
    生活 = "生活",
    科技 = "科技",
    興趣 = "興趣",
}

export interface ProfileJSON extends GeneralJson{
    response:    ProfileResponse;
}

export interface ProfileResponse {
    user: User;
    me:   Me;
}

export interface PropertyJSON extends GeneralJson{
    response:    PropertyResponse;
}

export interface PropertyResponse {
    lihkg:                boolean;
    category_list:        Category[];
    fixed_category_list:  FixedCategoryList[];
    config:               Config;
    keyword_filter_list?: any[];
    category_order?:      any[];
    me?:                  Me;
}

export interface Config {
    flurry_fix:        boolean;
    preload:           boolean;
    hot_interval:      number;
    request_timeout:   number;
    ad_start_count:    number;
    ad_interval_count: number;
    native:            ConfigNative;
    banner:            ConfigBanner;
    native_popup:      NativePopup;
    popup:             Browser;
    native_banner:     ConfigNativeBanner;
    browser:           Browser;
    pm:                Pm;
    pm_reply:          PmReply;
    video:             PmReply;
    adult_ad:          boolean;
    dc:                number;
    ds:                number;
    dd:                number;
    dm:                boolean;
    pri:               number;
    maxpin:            number;
    sni:               number;
    pemsg:             string;
    f_startTime:       number;
    f_endTime:         number;
    f_fadeInTime:      number;
    f_fadeOutTime:     number;
    f_appearTime:      number;
    f_interval:        number;
    ios:               Ios;
    android:           Android;
}

export interface Android {
    dv:            boolean;
    pri:           number;
    maxpin:        number;
    native_banner: AndroidNativeBanner;
    banner:        AndroidBanner;
    native:        AndroidNative;
}

export interface AndroidBanner {
    facebook: Facebook;
    flurry:   Facebook;
    admob:    Facebook;
}

export interface Facebook {
    backfill: number[];
}

export interface AndroidNative {
    preload: Preload1;
}

export interface Preload1 {
    interval:      number;
    flurry_banner: number;
    fb_banner:     number;
}

export interface AndroidNativeBanner {
    facebook: number;
    flurry:   number;
}

export interface ConfigBanner {
    facebook: Facebook;
    flurry:   Facebook;
}

export interface Browser {
    native: number;
    dfp:    number;
}

export interface Ios {
    dv: boolean;
}

export interface ConfigNative {
    preload: Preload2;
}

export interface Preload2 {
    flurry_banner: number;
    flurry_popup:  number;
    fb_banner:     number;
    fb_popup:      number;
    admob_native:  number;
    interval:      number;
}

export interface ConfigNativeBanner {
    facebook: number;
    flurry:   number;
    admob:    number;
}

export interface NativePopup {
    rate:         number;
    max:          number;
    facebook:     number;
    flurry:       number;
    admob:        number;
    admob_native: number;
    admob_max:    number;
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
    success:     number;
    server_time: number;
    response:    Response;
}

export interface Response {
    category:      Category;
    is_pagination: boolean;
    items:         Thread[];
    me?:           Me;
}

// Converts JSON strings to/from your types
export namespace Convert {
    export function toBlockedUserJSON(json: string): BlockedUserJSON {
        return JSON.parse(json);
    }

    export function blockedUserJSONToJson(value: BlockedUserJSON): string {
        return JSON.stringify(value, null, 2);
    }

    export function toBlockUserResponse(json: string): BlockUserResponse {
        return JSON.parse(json);
    }

    export function blockUserResponseToJson(value: BlockUserResponse): string {
        return JSON.stringify(value, null, 2);
    }

    export function toContentJSON(json: string): ContentJSON {
        return JSON.parse(json);
    }

    export function contentJSONToJson(value: ContentJSON): string {
        return JSON.stringify(value, null, 2);
    }

    export function toContentResponse(json: string): Thread {
        return JSON.parse(json);
    }

    export function contentResponseToJson(value: Thread): string {
        return JSON.stringify(value, null, 2);
    }

    export function toEmoji(json: string): Emoji {
        return JSON.parse(json);
    }

    export function emojiToJson(value: Emoji): string {
        return JSON.stringify(value, null, 2);
    }

    export function toEmojis(json: string): Emoji[] {
        return JSON.parse(json);
    }

    export function emojisToJson(value: Emoji[]): string {
        return JSON.stringify(value, null, 2);
    }

    export function toFollowingUserJSON(json: string): FollowingUserJSON {
        return JSON.parse(json);
    }

    export function followingUserJSONToJson(value: FollowingUserJSON): string {
        return JSON.stringify(value, null, 2);
    }

    export function toFollowingUserResponse(json: string): FollowingUserResponse {
        return JSON.parse(json);
    }

    export function followingUserResponseToJson(value: FollowingUserResponse): string {
        return JSON.stringify(value, null, 2);
    }

    export function toImagesListJSON(json: string): ImagesListJSON {
        return JSON.parse(json);
    }

    export function imagesListJSONToJson(value: ImagesListJSON): string {
        return JSON.stringify(value, null, 2);
    }

    export function toImagesResponse(json: string): ImagesResponse {
        return JSON.parse(json);
    }

    export function imagesResponseToJson(value: ImagesResponse): string {
        return JSON.stringify(value, null, 2);
    }

    export function toLikeJSON(json: string): LikeJSON {
        return JSON.parse(json);
    }

    export function likeJSONToJson(value: LikeJSON): string {
        return JSON.stringify(value, null, 2);
    }

    export function toLikeReponse(json: string): LikeReponse {
        return JSON.parse(json);
    }

    export function likeReponseToJson(value: LikeReponse): string {
        return JSON.stringify(value, null, 2);
    }

    export function toLoginJSON(json: string): LoginJSON {
        return JSON.parse(json);
    }

    export function loginJSONToJson(value: LoginJSON): string {
        return JSON.stringify(value, null, 2);
    }

    export function toLoginResponse(json: string): LoginResponse {
        return JSON.parse(json);
    }

    export function loginResponseToJson(value: LoginResponse): string {
        return JSON.stringify(value, null, 2);
    }

    export function toPost(json: string): Post {
        return JSON.parse(json);
    }

    export function postToJson(value: Post): string {
        return JSON.stringify(value, null, 2);
    }

    export function toProfileJSON(json: string): ProfileJSON {
        return JSON.parse(json);
    }

    export function profileJSONToJson(value: ProfileJSON): string {
        return JSON.stringify(value, null, 2);
    }

    export function toProfileResponse(json: string): ProfileResponse {
        return JSON.parse(json);
    }

    export function profileResponseToJson(value: ProfileResponse): string {
        return JSON.stringify(value, null, 2);
    }

    export function toPropertyJSON(json: string): PropertyJSON {
        return JSON.parse(json);
    }

    export function propertyJSONToJson(value: PropertyJSON): string {
        return JSON.stringify(value, null, 2);
    }

    export function toPropertyResponse(json: string): PropertyResponse {
        return JSON.parse(json);
    }

    export function propertyResponseToJson(value: PropertyResponse): string {
        return JSON.stringify(value, null, 2);
    }

    export function toThread(json: string): Thread {
        return JSON.parse(json);
    }

    export function threadToJson(value: Thread): string {
        return JSON.stringify(value, null, 2);
    }

    export function toTopicListJSON(json: string): TopicListJSON {
        return JSON.parse(json);
    }

    export function topicListJSONToJson(value: TopicListJSON): string {
        return JSON.stringify(value, null, 2);
    }
}
