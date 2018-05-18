import httpClient from './httpClient';
import Topic from '../models/Topic';
import Reply from '../models/Reply';
import { getHkgId, getLihkgId } from './categories';
import {
  HKG_API_ENDPOINT,
  LIHKG_API_ENDPOINT,
  HKG_VIEW_TOPIC_BASE,
  LIHKG_VIEW_TOPIC_BASE,
} from '../constants';

function sortTopicsByLastReplyMoment(a, b) {
  if (a.lastReplyMoment.isBefore(b.lastReplyMoment)) {
    return -1;
  }
  if (a.lastReplyMoment.isAfter(b.lastReplyMoment)) {
    return 1;
  }
  return 0;
}

export async function fetchHkgTopics({ category, page } = {}) {
  let hkgTopics = [];
  const hkgId = getHkgId(category);
  if (hkgId) {
    try {
      const url = new URL(`topics/${hkgId}/${page}`, HKG_API_ENDPOINT);
      const res = await httpClient.get(url.href);
      hkgTopics = [].concat(res.data.list).map(t => new Topic({
        ...t,
        topicId: t.id,
        forum: 'HKG',
        category,
        authorGender: t.authorGender ? 'M' : 'F',
        createdDate: t.messageDate,
        like: t.marksGood,
        dislike: t.marksBad,
        href: new URL(t.id, HKG_VIEW_TOPIC_BASE).href,
      })).sort(sortTopicsByLastReplyMoment).reverse();
    } catch (e) {
      if (e.internal) {
        throw e;
      } else {
        throw new Error('高登冇應機');
      }
    }
  }
  return hkgTopics;
}

export async function fetchLihkgTopics({ category, page } = {}) {
  let lihkgTopics = [];
  const lihkgId = getLihkgId(category);
  if (lihkgId && !(page >= 2 && lihkgId === 2)) {
    try {
      let url;
      if (lihkgId === 1) {
        url = new URL('thread/latest', LIHKG_API_ENDPOINT);
      } else if (lihkgId === 2) {
        url = new URL('thread/hot', LIHKG_API_ENDPOINT);
      } else if (lihkgId === 3) {
        url = new URL('thread/news', LIHKG_API_ENDPOINT);
      } else {
        url = new URL('thread/category', LIHKG_API_ENDPOINT);
      }
      url.search = new URLSearchParams({
        cat_id: lihkgId,
        page,
        count: 30,
        type: 'now',
      });
      const res = await httpClient.get(url.href);
      lihkgTopics = [].concat(res.response.items).map(t => new Topic({
        topicId: t.thread_id,
        forum: 'LIHKG',
        category,
        title: t.title,
        createdDate: t.create_time,
        authorId: t.user.user_id,
        authorName: t.user_nickname,
        authorGender: t.user_gender,
        lastReplyDate: t.last_reply_time * 1000,
        totalReplies: t.no_of_reply,
        like: t.reply_like_count,
        dislike: t.reply_dislike_count,
        totalPage: t.total_page,
        href: new URL(t.thread_id, LIHKG_VIEW_TOPIC_BASE).href,
      })).sort(sortTopicsByLastReplyMoment).reverse();
    } catch (e) {
      if (e.internal) {
        throw e;
      } else {
        throw new Error('LIHKG冇應機');
      }
    }
  }
  return lihkgTopics;
}

export async function fetchTopics({ category, page } = {}) {
  const [hkgTopics, lihkgTopics] = await Promise.all([
    fetchHkgTopics({ category, page }),
    fetchLihkgTopics({ category, page }),
  ]);
  const result = [];
  while (hkgTopics.length > 0 || lihkgTopics.length > 0) {
    if (hkgTopics.length > 0 && lihkgTopics.length > 0) {
      if (hkgTopics[0].lastReplyMoment.isAfter(lihkgTopics[0].lastReplyMoment)) {
        result.push(hkgTopics.shift());
      } else {
        result.push(lihkgTopics.shift());
      }
    } else if (hkgTopics.length > 0) {
      result.push(hkgTopics.shift());
    } else if (lihkgTopics.length > 0) {
      result.push(lihkgTopics.shift());
    }
  }
  return result;
}

export async function fetchReplies({ thread, page = 1, forum } = {}) {
  switch (forum) {
    case 'HKG': {
      const url = new URL(`view/${thread}/${page}`, HKG_API_ENDPOINT);
      const res = await httpClient.get(url.href);
      let first = [];
      if (page === 1) {
        first = [new Reply({
          ...res.data,
          replyId: res.data.id,
          forum: 'HKG',
          index: 0,
          authorGender: res.data.authorGender ? 'M' : 'F',
          replyDate: res.data.messageDate,
        })];
      }
      const replies = first.concat((res.data.replies).map(r => new Reply({
        ...r,
        replyId: r.id,
        forum: 'HKG',
        index: r.index,
        authorGender: r.authorGender ? 'M' : 'F',
      })));
      return {
        title: res.data.title,
        totalPage: res.data.totalPage,
        replies,
      };
    }
    case 'LIHKG': {
      const url = new URL(`thread/${thread}/page/${page}`, LIHKG_API_ENDPOINT);
      const res = await httpClient.get(url.href);
      const replies = [].concat(res.response.item_data).map(r => new Reply({
        replyId: r.post_id,
        forum: 'LIHKG',
        index: r.msg_num,
        authorId: r.user.user_id,
        authorName: r.user_nickname,
        authorGender: r.user_gender,
        content: r.msg,
        replyDate: r.reply_time * 1000,
      }));
      return {
        title: res.response.title,
        totalPage: res.response.total_page,
        replies,
      };
    }
    default: {
      throw new Error('Unknown Forum');
    }
  }
}
