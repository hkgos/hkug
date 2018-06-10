import { create, PostOrder, ThreadMediaIncludeLink, getEmoji} from './api';

getEmoji().then(emojis => console.log(emojis));

create().then(client => {
    client.getTopicList({
        cat_id: "15",
        page: 1,
        count: 60,
        sub_cat_id: -1
    })
    // .then(response => client.login({
    //     email: 'FUCKING@EMAIL.COM',
    //     password: 'FUCKINGPASSWORD'
    // }))
    // .then(response => client.getProperty())
    // .then(response => client.getTopicList({
    //     cat_id: "15",
    //     page: 1,
    //     count: 60,
    //     sub_cat_id: -1
    // }))
    // .then(response => client.getThreadContent({
    //     thread_id: 694606,
    //     page: 1,
    //     order: PostOrder.replyTime
    // }))
    // .then(response => client.getThreadMedia({
    //     include_link: ThreadMediaIncludeLink.No,
    //     thread_id: 233711
    // }))
    // .then(response => client.likeThread({
    //     thread_id: 233711,
    //     like: false
    // }))
    // .then(response => client.reply({
    //     thread_id: 499908,
    //     content: 'on9'
    // }))
    ;
});



