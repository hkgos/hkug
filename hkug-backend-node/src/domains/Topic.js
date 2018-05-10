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
  }

  // Delete any 'Private' / Unwanted props
  toJSON() {
    return ({
      ...this,
    });
  }
}
