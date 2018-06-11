"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
api_1.getEmoji().then(emojis => console.log(emojis));
api_1.create().then(client => {
    client.getTopicList({
        cat_id: "15",
        page: 1,
        count: 60,
        sub_cat_id: -1
    });
});
//# sourceMappingURL=test.js.map