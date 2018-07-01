// # Introduction
// HKGolden.com forum API
//
// # Overview
// Things that the developers should know about
//
// # Authentication
// What is the preferred way of using the API?
//
// # Error Codes
// What errors and status codes can a user expect?
//
// # Rate limit
// Is there a limit to the number of requests an user can send?

/**
 * TopicList
 *
 * GET
 *
 * https://api-1.hkgolden.com/topics2.aspx?s={{guestTopicListKey}}&type={{topicType}}&page=1&pagesize=50&filtermode=N&user_id=0&block=Y&sensormode=N&returntype=json&thumb=Y&thumb_max_width=1028&thumb_max_height=768&hotOnly=N
 */
export interface TopicList {
    success:    boolean;
    error_msg:  string;
    total:      number;
    max_page:   number;
    topic_list: TopicListElement[];
}

export interface TopicListElement {
    Message_ID:      number;
    Forum_Type:      string;
    Message_Title:   string;
    Author_ID:       number;
    Author_Name:     string;
    Author_Gender:   AuthorGender;
    Last_Reply_Date: string;
    MessageDate:     string;
    Total_Replies:   number;
    Message_Status:  MessageStatus;
    Message_Body:    string;
    Marks_Good:      number;
    Marks_Bad:       number;
    Thumbnail_Big:   string;
    Thumbnail_Small: string;
    Thumbnail_Meta:  string;
    Is_Bookmarked:   boolean;
    Is_Blocked:      boolean;
    iconType:        IconType;
}

export enum AuthorGender {
    F = "F",
    M = "M",
}

export enum MessageStatus {
    A = "A",
}

export enum IconType {
    Fresh = "Fresh",
    Hot = "Hot",
    Normal = "Normal",
}

/**
 * Login
 *
 * POST https://api-1.hkgolden.com/login.aspx
 */
export interface Login {
    success:   boolean;
    error_msg: string;
    userinfo:  Userinfo;
}

export interface Userinfo {
    email_id:  null | string;
    id_key:    number;
    nickname:  null | string;
    mbr_class: null | string;
    team_id:   number;
    NoOfPMs:   number;
    gender:    string;
}

/**
 * Reply
 *
 * POST https://api-1.hkgolden.com/post.aspx
 *
 * Reply
 */
export interface Reply {
    success:   boolean;
    error_msg: string;
    messageid: number;
}

/**
 * Post
 *
 * POST https://api-1.hkgolden.com/post.aspx
 */
export interface Post {
    success:   boolean;
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
    success:         boolean;
    error_msg:       string;
    Author_ID:       number;
    Author_Name:     string;
    Author_Gender:   string;
    Message_ID:      number;
    Message_Title:   string;
    Message_Status:  string;
    Message_Date:    string;
    Last_Reply_Date: string;
    Total_Replies:   number;
    Rating_Good:     number;
    Rating_Bad:      number;
    Rating:          number;
    rated:           number;
    Total_Pages:     number;
    Current_Pages:   number;
    totalBookmarked: number;
    userBookmarked:  number;
    messages:        Message[];
    images:          string[];
    gridImages:      string[];
    compressImages:  string[];
    Forum_Type:      string;
}

export interface Message {
    Reply_ID:      number;
    Author_ID:     number;
    Author_Name:   string;
    Author_Gender: AuthorGender;
    Message_Date:  string;
    Message_Body:  string;
    isBlock:       IsBlock;
}

export enum IsBlock {
    Empty = "",
    N = "N",
}

// Converts JSON strings to/from your types
export namespace Convert {
    export function toTopicList(json: string): TopicList {
        return JSON.parse(json);
    }

    export function topicListToJson(value: TopicList): string {
        return JSON.stringify(value, null, 2);
    }

    export function toLogin(json: string): Login {
        return JSON.parse(json);
    }

    export function loginToJson(value: Login): string {
        return JSON.stringify(value, null, 2);
    }

    export function toReply(json: string): Reply {
        return JSON.parse(json);
    }

    export function replyToJson(value: Reply): string {
        return JSON.stringify(value, null, 2);
    }

    export function toPost(json: string): Post {
        return JSON.parse(json);
    }

    export function postToJson(value: Post): string {
        return JSON.stringify(value, null, 2);
    }

    export function toThreadContent(json: string): ThreadContent {
        return JSON.parse(json);
    }

    export function threadContentToJson(value: ThreadContent): string {
        return JSON.stringify(value, null, 2);
    }
}
