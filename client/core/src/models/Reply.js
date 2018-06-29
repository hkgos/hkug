export default function Reply({
  replyId,
  forum,
  index,
  authorId,
  authorName,
  authorGender,
  content,
  replyDate,
}) {
  return ({
    replyId: String(replyId),
    forum: String(forum),
    index: Number(index),
    authorId: String(authorId),
    authorName: String(authorName),
    authorGender: String(authorGender),
    content: String(content),
    replyDate: Number(replyDate),
  });
}
