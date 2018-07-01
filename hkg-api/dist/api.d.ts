import { ThreadContent, TopicList } from './model';
export interface HKG {
    login(request: LoginRequest): Promise<any>;
    getThreadContent(request: RepliesRequest): Promise<ThreadContent>;
    getTopicList(request: TopicListRequest): Promise<TopicList>;
    getVersion(): Promise<any>;
}
export interface LoginRequest {
    username: string;
    pass: string;
}
export interface RepliesRequest {
    message: string;
    page: number;
}
export interface TopicListRequest {
    type: string;
    page: number;
}
export interface HKGConfig {
    baseURL?: string;
}
export declare function create(config?: HKGConfig): Promise<HKG>;
