import md5 from 'crypto-js/md5';
import URI from 'urijs';
import httpClient from './httpClient';
import Topic from '../models/Topic';
import Reply from '../models/Reply';
import { getHkgId, getLihkgId } from './categories';
import {
  HKG_API_ENDPOINT_WEB,
  HKG_API_ENDPOINT_MOBILE,
  LIHKG_API_ENDPOINT,
} from '../constants';

function constructBlockquote(q) {
  if (!q) {
    return '';
  }
  if (!q.quote && q.quote_post_id && q.quote_post_id !== '') {
    return `<blockquote><blockquote><button data-quote-post-id="${q.quote_post_id}" /></blockquote>${q.msg}</blockquote>`;
  }
  return `<blockquote>${constructBlockquote(q.quote)}${q.msg}</blockquote>`;
}

function sortTopicsByLastReplyDate(a, b) {
  if (a.lastReplyDate.getTime() < b.lastReplyDate.getTime()) {
    return -1;
  }
  if (a.lastReplyDate.getTime() > b.lastReplyDate.getTime()) {
    return 1;
  }
  return 0;
}

export async function fetchHkgTopics({ category, page } = {}) {
  let hkgTopics = [];
  const hkgId = getHkgId(category);
  if (hkgId) {
    try {
      const url = new URI('newTopics.aspx', HKG_API_ENDPOINT_MOBILE);
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1 >= 10 ? String(now.getMonth() + 1) : `0${now.getMonth() + 1}`;
      const day = now.getDate() >= 10 ? String(now.getDate()) : `0${now.getDate()}`;
      const userId = 0;
      const block = 'N';
      const filter = 'N';
      const s = md5(`${year}${month}${day}_HKGOLDEN_%GUEST%_$API#Android_1_2^${hkgId}_${page}_${filter}_N`).toString();
      url.search({
        s,
        user_id: userId,
        type: hkgId,
        page,
        filtermode: filter,
        block,
        sensormode: 'N',
        returntype: 'json',
      });
      const res = await httpClient.get(url.href());
      hkgTopics = [].concat(res.topic_list).map(t => new Topic({
        topicId: t.Message_ID,
        forum: 'HKG',
        category,
        title: t.Message_Title,
        createdDate: t.MessageDate.substring(t.MessageDate.lastIndexOf('(') + 1, t.MessageDate.lastIndexOf(')')),
        authorId: t.Author_ID,
        authorName: t.Author_Name,
        lastReplyDate: t.Last_Reply_Date.substring(t.Last_Reply_Date.lastIndexOf('(') + 1, t.Last_Reply_Date.lastIndexOf(')')),
        totalReplies: t.Total_Replies,
        like: t.Marks_Good,
        dislike: t.Marks_Bad,
      })).sort(sortTopicsByLastReplyDate).reverse();
    } catch (e) {
      // Fallback to WEB API
      const url = new URI(`topics/${hkgId}/${page}`, HKG_API_ENDPOINT_WEB);
      const res = await httpClient.get(url.href());
      hkgTopics = [].concat(res.data.list).map(t => new Topic({
        ...t,
        topicId: t.id,
        forum: 'HKG',
        category,
        authorGender: t.authorGender ? 'M' : 'F',
        createdDate: t.messageDate,
        like: t.marksGood,
        dislike: t.marksBad,
      })).sort(sortTopicsByLastReplyDate).reverse();
    }
  }
  return hkgTopics;
}

export async function fetchLihkgTopics({ category, page, type } = {}) {
  let lihkgTopics = [];
  const lihkgId = getLihkgId(category);
  if (lihkgId) {
    let url;
    if (lihkgId === 3) {
      // If 3 (new topics), ignore type.
      url = new URI('thread/news', LIHKG_API_ENDPOINT);
      url.search({
        cat_id: lihkgId,
        page,
        type: 'now',
      });
    } else if (lihkgId === 2) {
      // If 2 (hot topics), param should be put in type.
      url = new URI('thread/hot', LIHKG_API_ENDPOINT);
      url.search({
        cat_id: lihkgId,
        page,
        type,
      });
    } else {
      if (lihkgId === 1) {
        url = new URI('thread/latest', LIHKG_API_ENDPOINT);
      } else {
        url = new URI('thread/category', LIHKG_API_ENDPOINT);
      }
      url.search({
        cat_id: lihkgId,
        page,
        type: 'now',
        order: type,
      });
    }
    const res = await httpClient.get(url.href());
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
      like: t.like_count,
      dislike: t.dislike_count,
      totalPage: t.total_page === 0 ? 1 : t.total_page,
    })).sort(sortTopicsByLastReplyDate).reverse();
  }
  return lihkgTopics;
}

export async function fetchTopics({ category, page, type } = { type: 'all' }) {
  let t1;
  let t2;
  switch (type) {
    case 'all':
      t1 = fetchHkgTopics({ category, page });
      t2 = fetchLihkgTopics({ category, page, type: 'now' });
      break;
    case 'hkg':
      t1 = fetchHkgTopics({ category, page });
      break;
    case 'lihkg':
      t2 = fetchLihkgTopics({ category, page, type: 'now' });
      break;
    case 'hot':
      t2 = fetchLihkgTopics({ category, page, type });
      break;
    case 'daily':
      t2 = fetchLihkgTopics({ category, page, type });
      break;
    case 'weekly':
      t2 = fetchLihkgTopics({ category, page, type });
      break;
    default:
      t1 = fetchHkgTopics({ category, page });
      t2 = fetchLihkgTopics({ category, page, type: 'now' });
      break;
  }
  let hkgTopics = [];
  let hkgError;
  let lihkgTopics = [];
  let lihkgError;
  if (t1) {
    try {
      hkgTopics = await t1;
    } catch (e) {
      hkgError = new Error('高登冇應機');
    }
  }
  if (t2) {
    try {
      lihkgTopics = await t2;
    } catch (e) {
      lihkgError = new Error('連登冇應機');
    }
  }
  const topics = [];
  while (hkgTopics.length > 0 || lihkgTopics.length > 0) {
    if (hkgTopics.length > 0 && lihkgTopics.length > 0) {
      if (hkgTopics[0].lastReplyDate.getTime() > lihkgTopics[0].lastReplyDate.getTime()) {
        topics.push(hkgTopics.shift());
      } else {
        topics.push(lihkgTopics.shift());
      }
    } else if (hkgTopics.length > 0) {
      topics.push(hkgTopics.shift());
    } else if (lihkgTopics.length > 0) {
      topics.push(lihkgTopics.shift());
    }
  }
  return {
    topics,
    hkgError,
    lihkgError,
  };
}

export async function fetchHkgReplies({ thread, page = 1 } = {}) {
  try {
    const url = new URI('newView.aspx', HKG_API_ENDPOINT_MOBILE);
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1 >= 10 ? String(now.getMonth() + 1) : `0${now.getMonth() + 1}`;
    const day = now.getDate() >= 10 ? String(now.getDate()) : `0${now.getDate()}`;
    const userId = 0;
    const block = 'N';
    const filter = 'N';
    const limit = 25;
    const start = (page - 1) * limit;
    const s = md5(`${year}${month}${day}_HKGOLDEN_%GUEST%_$API#Android_1_2^${thread}_${start}_${filter}_N`).toString();
    url.search({
      s,
      user_id: userId,
      message: thread,
      limit,
      start,
      page,
      block,
      filtermode: filter,
      sensormode: 'N',
      returntype: 'json',
    });
    const res = await httpClient.get(url.href());
    const replies = res.messages.map((r, i) => new Reply({
      replyId: r.Reply_ID,
      forum: 'HKG',
      index: start + i + 1,
      authorId: r.Author_ID,
      authorName: r.Author_Name,
      authorGender: r.Author_Gender,
      content: r.Message_Body,
      replyDate: r.Message_Date.substring(r.Message_Date.lastIndexOf('(') + 1, r.Message_Date.lastIndexOf(')')),
    }));
    return {
      title: res.Message_Title,
      totalPage: res.Total_Pages === 0 ? 1 : res.Total_Pages,
      replies,
      like: Number(res.Rating_Good),
      dislike: Number(res.Rating_Bad),
    };
  } catch (e) {
    // Fallback to WEB API
    const url = new URI(`view/${thread}/${page}`, HKG_API_ENDPOINT_WEB);
    const res = await httpClient.get(url.href());
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
      totalPage: res.data.totalPage === 0 ? 1 : res.data.totalPage,
      replies,
    };
  }
}

export async function fetchReplies({ thread, page = 1, forum } = {}) {
  switch (forum) {
    case 'HKG': {
      return fetchHkgReplies({ thread, page });
    }
    case 'LIHKG': {
      const url = new URI(`thread/${thread}/page/${page}`, LIHKG_API_ENDPOINT);
      const res = await httpClient.get(url.href());
      const replies = [].concat(res.response.item_data).map(r => new Reply({
        replyId: r.post_id,
        forum: 'LIHKG',
        index: r.msg_num,
        authorId: r.user.user_id,
        authorName: r.user_nickname,
        authorGender: r.user_gender,
        content: `${constructBlockquote(r.quote)}${r.msg}`,
        replyDate: r.reply_time * 1000,
      }));
      return {
        title: res.response.title,
        totalPage: res.response.total_page === 0 ? 1 : res.response.total_page,
        replies,
        like: Number(res.response.like_count),
        dislike: Number(res.response.dislike_count),
      };
    }
    default: {
      throw new Error('Unknown Forum');
    }
  }
}

export async function fetchQuote({ thread, quote } = {}) {
  const url = new URI(`thread/${thread}/${quote}`, LIHKG_API_ENDPOINT);
  const res = await httpClient.get(url.href());
  const data = `${constructBlockquote(res.response.post.quote)}${res.response.post.msg}`;
  return data;
}
