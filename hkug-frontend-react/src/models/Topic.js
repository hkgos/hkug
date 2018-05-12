import moment from 'moment';

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
    href,
  } = {}) {
    this.topicId = String(topicId);
    this.forum = forum;
    this.category = category;
    this.title = title;
    this.createdDate = createdDate;
    this.authorId = authorId;
    this.authorName = authorName;
    this.authorGender = authorGender;
    this.lastReplyDate = lastReplyDate;
    this.totalReplies = Number(totalReplies);
    this.like = Number(like);
    this.dislike = Number(dislike);
    this.totalPage = Number(totalPage);
    this.href = href;
  }

  get lastReplyMoment() {
    return moment(this.lastReplyDate);
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
