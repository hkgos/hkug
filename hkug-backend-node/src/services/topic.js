import map from 'lodash/fp/map';

import Topic from '../domains/Topic';
import { fetchHKGTopics, fetchLIHKGTopics } from '../utils/api';

export async function getTopic() {
  // TODO: Implement get specific topic service
}

export async function getTopics({ forum, category, page } = {}) {
  switch (forum) {
    case 'HKG': {
      const data = await fetchHKGTopics({ category, page });
      return map(t => new Topic({
        ...t,
        topicId: t.id,
        forum,
        category,
        authorGender: t.authorGender ? 'M' : 'F',
        createdDate: t.messageDate,
        like: t.marksGood,
        dislike: t.marksBad,
      }).toJSON())(data);
    }
    case 'LIHKG': {
      const data = await fetchLIHKGTopics({ category, page });
      return map(t => new Topic({
        topicId: t.thread_id,
        forum,
        category,
        title: t.title,
        createdDate: t.create_time,
        authorId: t.user.user_id,
        authorName: t.user_nickname,
        authorGender: t.user_gender,
        lastReplyDate: t.last_reply_time,
        totalReplies: t.no_of_reply,
        like: t.reply_like_count,
        dislike: t.reply_dislike_count,
        totalPage: t.total_page,
      }).toJSON())(data);
    }
    default:
      return [];
  }
}
