import { PropertyJSON, Emoji, LoginJSON, TopicListJSON, ContentJSON, ImagesListJSON, LikeJSON, ProfileJSON, BlockedUserJSON, FollowingUserJSON } from './model';
export interface LIHKG {
    getTopicList(request: TopicListRequest): Promise<TopicListJSON>;
    getTopicListByThreadId(threadIds: String[]): any;
    getThreadContent(request: ThreadContentRequest): Promise<ContentJSON>;
    getThreadMedia(request: ThreadMediaRequest): Promise<ImagesListJSON>;
    getBookmark(request: BookmarkRequest): Promise<TopicListJSON>;
    getProperty(): Promise<PropertyJSON>;
    getProfile(request: ProfileRequest): Promise<ProfileJSON>;
    getBlockedUser(): Promise<BlockedUserJSON>;
    getFollowingUser(): Promise<FollowingUserJSON>;
    search(request: SearchRequest): Promise<TopicListJSON>;
    login(request: LoginRequest): Promise<LoginJSON>;
    reply(request: ReplyRequest): Promise<any>;
    likeThread(request: LikeThreadRequest): Promise<LikeJSON>;
    likePost(request: LikePostRequest): Promise<any>;
}
export declare enum PostOrder {
    replyTime = "reply_time",
    score = "score"
}
export declare enum ThreadSearchOrder {
    score = "score",
    descCreateTime = "desc_create_time",
    descReplyTime = "desc_reply_time"
}
export declare enum ThreadMediaIncludeLink {
    Yes = "1",
    No = "0"
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface BookmarkRequest {
    page: number;
}
export interface ProfileRequest {
    user_id: number;
}
export interface ThreadMediaRequest {
    thread_id: number;
    include_link: ThreadMediaIncludeLink;
}
export interface TopicListRequest {
    cat_id: string;
    sub_cat_id: number;
    page: number;
    count: number;
}
export interface ThreadContentRequest {
    thread_id: number;
    page: number;
    order: PostOrder;
}
export interface ReplyRequest {
    thread_id: number;
    content: string;
}
export interface LikeThreadRequest {
    thread_id: number;
    like: boolean;
}
export interface LikePostRequest {
    thread_id: number;
    post_id: string;
    like: boolean;
}
export interface SearchRequest {
    q: string;
    sort: ThreadSearchOrder;
    page: number;
    count: number;
    cat_id?: number;
    sub_cat_id?: number;
}
export declare function getEmoji(): Promise<Emoji[]>;
export interface LIHKGConfig {
    baseURL?: string;
    user_id?: string;
    token?: string;
}
export declare function create(config?: LIHKGConfig): Promise<LIHKG>;
