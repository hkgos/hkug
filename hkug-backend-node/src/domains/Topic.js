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
    this.topicId = topicId;
    this.forum = forum;
    this.category = category;
    this.title = title;
    this.createdDate = createdDate;
    this.authorId = authorId;
    this.authorName = authorName;
    this.authorGender = authorGender;
    this.lastReplyDate = lastReplyDate;
    this.totalReplies = totalReplies;
    this.like = like;
    this.dislike = dislike;
    this.totalPage = totalPage;
  }

  // Delete any 'Private' / Unwanted props
  toJSON() {
    return ({
      ...this,
    });
  }
}
