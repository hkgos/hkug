import httpClient from './httpClient';
import Topic from '../models/Topic';
import { getHkgId, getLihkgId } from './categories';
import {
  HKG_API_ENDPOINT,
  LIHKG_API_ENDPOINT,
  HKG_VIEW_TOPIC_BASE,
  LIHKG_VIEW_TOPIC_BASE,
} from '../constants';

/* eslint-disable import/prefer-default-export */
export async function fetchTopics({ category, page } = {}) {
  let hkgTopics = [];
  let lihkgTopics = [];
  const hkgId = getHkgId(category);
  const lihkgId = getLihkgId(category);
  if (hkgId) {
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
    }));
  }
  if (lihkgId && !(page >= 2 && lihkgId === 2)) {
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
      lastReplyDate: t.last_reply_time,
      totalReplies: t.no_of_reply,
      like: t.reply_like_count,
      dislike: t.reply_dislike_count,
      totalPage: t.total_page,
      href: new URL(t.thread_id, LIHKG_VIEW_TOPIC_BASE).href,
    }));
  }
  const result = [];
  while (hkgTopics.length > 0 || lihkgTopics.length > 0) {
    if (hkgTopics.length > 0) {
      result.push(hkgTopics.shift());
    }
    if (lihkgTopics.length > 0) {
      result.push(lihkgTopics.shift());
    }
  }
  return result;
}
/* eslint-disable import/prefer-default-export */
