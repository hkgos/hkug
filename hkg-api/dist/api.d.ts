import { ThreadContent, TopicList, Reply, Post } from './model';
export interface HKG {
    login(request: LoginRequest): Promise<any>;
    getThreadContent(request: RepliesRequest): Promise<ThreadContent>;
    getTopicList(request: TopicListRequest): Promise<TopicList>;
    getVersion(): Promise<any>;
    reply(request: ReplyRequest): Promise<Reply>;
    newThread(request: NewThreadRequest): Promise<Post>;
}
export interface LoginRequest {
    username: string;
    pass: string;
}
export interface RepliesRequest {
    message: number;
    page: number;
}
export interface TopicListRequest {
    type: string;
    page: number;
}
export interface HKGConfig {
    baseURL?: string;
}
export interface ReplyRequest {
    message: number;
    body: string;
}
export interface NewThreadRequest {
    title: string;
    body: string;
    topicType: string;
}
export declare function create(config?: HKGConfig): Promise<HKG>;
