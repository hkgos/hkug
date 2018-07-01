"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var AuthorGender;
(function (AuthorGender) {
    AuthorGender["F"] = "F";
    AuthorGender["M"] = "M";
})(AuthorGender = exports.AuthorGender || (exports.AuthorGender = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["A"] = "A";
})(MessageStatus = exports.MessageStatus || (exports.MessageStatus = {}));
var IconType;
(function (IconType) {
    IconType["Fresh"] = "Fresh";
    IconType["Hot"] = "Hot";
    IconType["Normal"] = "Normal";
})(IconType = exports.IconType || (exports.IconType = {}));
var IsBlock;
(function (IsBlock) {
    IsBlock["Empty"] = "";
    IsBlock["N"] = "N";
})(IsBlock = exports.IsBlock || (exports.IsBlock = {}));
// Converts JSON strings to/from your types
var Convert;
(function (Convert) {
    function toTopicList(json) {
        return JSON.parse(json);
    }
    Convert.toTopicList = toTopicList;
    function topicListToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.topicListToJson = topicListToJson;
    function toLogin(json) {
        return JSON.parse(json);
    }
    Convert.toLogin = toLogin;
    function loginToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.loginToJson = loginToJson;
    function toReply(json) {
        return JSON.parse(json);
    }
    Convert.toReply = toReply;
    function replyToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.replyToJson = replyToJson;
    function toPost(json) {
        return JSON.parse(json);
    }
    Convert.toPost = toPost;
    function postToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.postToJson = postToJson;
    function toThreadContent(json) {
        return JSON.parse(json);
    }
    Convert.toThreadContent = toThreadContent;
    function threadContentToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.threadContentToJson = threadContentToJson;
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=model.js.map