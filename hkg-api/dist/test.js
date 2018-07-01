"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const console_1 = require("console");
api_1.create().then(client => {
    client.getVersion()
        .then(e => {
        console_1.default.log(e);
        return client.login({
            username: 'test@ust.hk',
            pass: 'test'
        });
    })
        .then(e => {
        console_1.default.log(e);
        return client.getThreadContent({ message: '6917815', page: 1 });
    })
        .then(e => console_1.default.log(e))
        .catch(e => console_1.default.log('error' + e));
});
//# sourceMappingURL=test.js.map