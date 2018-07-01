/**
 * TopicList
 *
 * GET
 *
 * https://api-1.hkgolden.com/topics2.aspx?s={{guestTopicListKey}}&type={{topicType}}&page=1&pagesize=50&filtermode=N&user_id=0&block=Y&sensormode=N&returntype=json&thumb=Y&thumb_max_width=1028&thumb_max_height=768&hotOnly=N
 */
export interface TopicList {
    success: boolean;
    error_msg: string;
    total: number;
    max_page: number;
    topic_list: TopicListElement[];
}
export interface TopicListElement {
    Message_ID: number;
    Forum_Type: string;
    Message_Title: string;
    Author_ID: number;
    Author_Name: string;
    Author_Gender: AuthorGender;
    Last_Reply_Date: string;
    MessageDate: string;
    Total_Replies: number;
    Message_Status: MessageStatus;
    Message_Body: string;
    Marks_Good: number;
    Marks_Bad: number;
    Thumbnail_Big: string;
    Thumbnail_Small: string;
    Thumbnail_Meta: string;
    Is_Bookmarked: boolean;
    Is_Blocked: boolean;
    iconType: IconType;
}
export declare enum AuthorGender {
    F = "F",
    M = "M"
}
export declare enum MessageStatus {
    A = "A"
}
export declare enum IconType {
    Fresh = "Fresh",
    Hot = "Hot",
    Normal = "Normal"
}
/**
 * Login
 *
 * POST https://api-1.hkgolden.com/login.aspx
 */
export interface Login {
    success: boolean;
    error_msg: string;
    userinfo: Userinfo;
}
export interface Userinfo {
    email_id: null | string;
    id_key: number;
    nickname: null | string;
    mbr_class: null | string;
    team_id: number;
    NoOfPMs: number;
    gender: string;
}
/**
 * Reply
 *
 * POST https://api-1.hkgolden.com/post.aspx
 *
 * Reply
 */
export interface Reply {
    success: boolean;
    error_msg: string;
    messageid: number;
}
/**
 * Post
 *
 * POST https://api-1.hkgolden.com/post.aspx
 */
export interface Post {
    success: boolean;
    error_msg: string;
    messageid: number;
}
/**
 * ThreadContent
 *
 * GET
 *
 * https://api-1.hkgolden.com/newView4.aspx?s={{userTopicDetailsKey}}&message={{postid}}&page={{postPage}}&user_id={{userid}}&pass={{passwordHashed}}&block=Y&sensormode=N&filterMode=N&returntype=json&image_max_width=1028
 */
export interface ThreadContent {
    success: boolean;
    error_msg: string;
    Author_ID: number;
    Author_Name: string;
    Author_Gender: string;
    Message_ID: number;
    Message_Title: string;
    Message_Status: string;
    Message_Date: string;
    Last_Reply_Date: string;
    Total_Replies: number;
    Rating_Good: number;
    Rating_Bad: number;
    Rating: number;
    rated: number;
    Total_Pages: number;
    Current_Pages: number;
    totalBookmarked: number;
    userBookmarked: number;
    messages: Message[];
    images: string[];
    gridImages: string[];
    compressImages: string[];
    Forum_Type: string;
}
export interface Message {
    Reply_ID: number;
    Author_ID: number;
    Author_Name: string;
    Author_Gender: AuthorGender;
    Message_Date: string;
    Message_Body: string;
    isBlock: IsBlock;
}
export declare enum IsBlock {
    Empty = "",
    N = "N"
}
export declare namespace Convert {
    function toTopicList(json: string): TopicList;
    function topicListToJson(value: TopicList): string;
    function toLogin(json: string): Login;
    function loginToJson(value: Login): string;
    function toReply(json: string): Reply;
    function replyToJson(value: Reply): string;
    function toPost(json: string): Post;
    function postToJson(value: Post): string;
    function toThreadContent(json: string): ThreadContent;
    function threadContentToJson(value: ThreadContent): string;
}
