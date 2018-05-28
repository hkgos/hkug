import {
  HKG_HOST,
  LIHKG_HOST,
} from '../constants';
import { getHkgId } from '../utils/categories';

export default class Topic {
  constructor({
    topicId,
    forum,
    category,
    title,
    createdDate,
    authorId,
    authorName,
    authorGender,
    lastReplyDate,
    totalReplies,
    like,
    dislike,
    totalPage,
  } = {}) {
    this.topicId = String(topicId);
    this.forum = String(forum);
    this.category = Number(category);
    this.title = String(title);
    this.createdDate = new Date(Number(createdDate));
    this.authorId = String(authorId);
    this.authorName = String(authorName);
    this.authorGender = String(authorGender);
    this.lastReplyDate = new Date(Number(lastReplyDate));
    this.totalReplies = Number(totalReplies);
    this.like = Number(like);
    this.dislike = Number(dislike);
    this.totalPage = Number(totalPage);
  }

  get href() {
    switch (this.forum) {
      case 'HKG': {
        const url = new URL('view.aspx', HKG_HOST);
        url.search = new URLSearchParams({
          type: getHkgId(this.category),
          message: this.topicId,
        });
        return url.href;
      }
      case 'LIHKG': {
        const url = new URL(`thread/${this.topicId}`, LIHKG_HOST);
        return url.href;
      }
      default:
        return undefined;
    }
  }

  get forumName() {
    switch (this.forum) {
      case 'HKG':
        return '高登';
      case 'LIHKG':
        return 'LIHKG';
      default:
        return this.forum;
    }
  }
}
