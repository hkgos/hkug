export default class Topic {
  constructor({
    id,
    forum,
    category,
    title,
    createdDate,
    authorId,
    authorName,
    lastReplyDate,
    totalReplies,
    like,
    dislike,
    totalPage,
  } = {}) {
    this.id = id;
    this.forum = forum;
    this.category = category;
    this.title = title;
    this.createdDate = createdDate;
    this.authorId = authorId;
    this.authorName = authorName;
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
