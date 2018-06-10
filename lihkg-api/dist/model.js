"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gender;
(function (Gender) {
    Gender["F"] = "F";
    Gender["M"] = "M";
})(Gender = exports.Gender || (exports.Gender = {}));
var LevelName;
(function (LevelName) {
    LevelName["\u666E\u901A\u6703\u54E1"] = "\u666E\u901A\u6703\u54E1";
})(LevelName = exports.LevelName || (exports.LevelName = {}));
var UserGender;
(function (UserGender) {
    UserGender["M"] = "M";
    UserGender["F"] = "F";
})(UserGender = exports.UserGender || (exports.UserGender = {}));
var Order;
(function (Order) {
    Order["Hot"] = "hot";
})(Order = exports.Order || (exports.Order = {}));
var QueryType;
(function (QueryType) {
    QueryType["Now"] = "now";
    QueryType["Daily"] = "daily";
    QueryType["Weekly"] = "weekly";
})(QueryType = exports.QueryType || (exports.QueryType = {}));
var URL;
(function (URL) {
    URL["HTTPSLihkgCOMAPIV2ThreadCategory"] = "https://lihkg.com/api_v2/thread/category";
    URL["HTTPSLihkgCOMAPIV2ThreadCustom"] = "https://lihkg.com/api_v2/thread/custom";
    URL["HTTPSLihkgCOMAPIV2ThreadHot"] = "https://lihkg.com/api_v2/thread/hot";
    URL["HTTPSLihkgCOMAPIV2ThreadLatest"] = "https://lihkg.com/api_v2/thread/latest";
    URL["HTTPSLihkgCOMAPIV2ThreadNews"] = "https://lihkg.com/api_v2/thread/news";
})(URL = exports.URL || (exports.URL = {}));
var CategoryListType;
(function (CategoryListType) {
    CategoryListType["Hkg"] = "hkg";
})(CategoryListType = exports.CategoryListType || (exports.CategoryListType = {}));
var Name;
(function (Name) {
    Name["Empty"] = "";
    Name["\u5176\u4ED6"] = "\u5176\u4ED6";
    Name["\u65B0\u805E"] = "\u65B0\u805E";
    Name["\u751F\u6D3B"] = "\u751F\u6D3B";
    Name["\u79D1\u6280"] = "\u79D1\u6280";
    Name["\u8208\u8DA3"] = "\u8208\u8DA3";
})(Name = exports.Name || (exports.Name = {}));
// Converts JSON strings to/from your types
var Convert;
(function (Convert) {
    function toBlockedUserJSON(json) {
        return JSON.parse(json);
    }
    Convert.toBlockedUserJSON = toBlockedUserJSON;
    function blockedUserJSONToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.blockedUserJSONToJson = blockedUserJSONToJson;
    function toBlockUserResponse(json) {
        return JSON.parse(json);
    }
    Convert.toBlockUserResponse = toBlockUserResponse;
    function blockUserResponseToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.blockUserResponseToJson = blockUserResponseToJson;
    function toContentJSON(json) {
        return JSON.parse(json);
    }
    Convert.toContentJSON = toContentJSON;
    function contentJSONToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.contentJSONToJson = contentJSONToJson;
    function toContentResponse(json) {
        return JSON.parse(json);
    }
    Convert.toContentResponse = toContentResponse;
    function contentResponseToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.contentResponseToJson = contentResponseToJson;
    function toEmoji(json) {
        return JSON.parse(json);
    }
    Convert.toEmoji = toEmoji;
    function emojiToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.emojiToJson = emojiToJson;
    function toEmojis(json) {
        return JSON.parse(json);
    }
    Convert.toEmojis = toEmojis;
    function emojisToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.emojisToJson = emojisToJson;
    function toFollowingUserJSON(json) {
        return JSON.parse(json);
    }
    Convert.toFollowingUserJSON = toFollowingUserJSON;
    function followingUserJSONToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.followingUserJSONToJson = followingUserJSONToJson;
    function toFollowingUserResponse(json) {
        return JSON.parse(json);
    }
    Convert.toFollowingUserResponse = toFollowingUserResponse;
    function followingUserResponseToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.followingUserResponseToJson = followingUserResponseToJson;
    function toImagesListJSON(json) {
        return JSON.parse(json);
    }
    Convert.toImagesListJSON = toImagesListJSON;
    function imagesListJSONToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.imagesListJSONToJson = imagesListJSONToJson;
    function toImagesResponse(json) {
        return JSON.parse(json);
    }
    Convert.toImagesResponse = toImagesResponse;
    function imagesResponseToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.imagesResponseToJson = imagesResponseToJson;
    function toLikeJSON(json) {
        return JSON.parse(json);
    }
    Convert.toLikeJSON = toLikeJSON;
    function likeJSONToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.likeJSONToJson = likeJSONToJson;
    function toLikeReponse(json) {
        return JSON.parse(json);
    }
    Convert.toLikeReponse = toLikeReponse;
    function likeReponseToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.likeReponseToJson = likeReponseToJson;
    function toLoginJSON(json) {
        return JSON.parse(json);
    }
    Convert.toLoginJSON = toLoginJSON;
    function loginJSONToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.loginJSONToJson = loginJSONToJson;
    function toLoginResponse(json) {
        return JSON.parse(json);
    }
    Convert.toLoginResponse = toLoginResponse;
    function loginResponseToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.loginResponseToJson = loginResponseToJson;
    function toPost(json) {
        return JSON.parse(json);
    }
    Convert.toPost = toPost;
    function postToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.postToJson = postToJson;
    function toProfileJSON(json) {
        return JSON.parse(json);
    }
    Convert.toProfileJSON = toProfileJSON;
    function profileJSONToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.profileJSONToJson = profileJSONToJson;
    function toProfileResponse(json) {
        return JSON.parse(json);
    }
    Convert.toProfileResponse = toProfileResponse;
    function profileResponseToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.profileResponseToJson = profileResponseToJson;
    function toPropertyJSON(json) {
        return JSON.parse(json);
    }
    Convert.toPropertyJSON = toPropertyJSON;
    function propertyJSONToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.propertyJSONToJson = propertyJSONToJson;
    function toPropertyResponse(json) {
        return JSON.parse(json);
    }
    Convert.toPropertyResponse = toPropertyResponse;
    function propertyResponseToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.propertyResponseToJson = propertyResponseToJson;
    function toThread(json) {
        return JSON.parse(json);
    }
    Convert.toThread = toThread;
    function threadToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.threadToJson = threadToJson;
    function toTopicListJSON(json) {
        return JSON.parse(json);
    }
    Convert.toTopicListJSON = toTopicListJSON;
    function topicListJSONToJson(value) {
        return JSON.stringify(value, null, 2);
    }
    Convert.topicListJSONToJson = topicListJSONToJson;
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=model.js.map