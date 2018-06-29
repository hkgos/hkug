import URI from 'urijs';
import {
  HKG_HOST,
  LIHKG_HOST,
} from '../constants';
import { getHkgId } from '../utils/categories';

function getHref({
  forum,
  category,
  topicId,
}) {
  switch (forum) {
    case 'HKG': {
      const url = new URI('view.aspx', HKG_HOST);
      url.search({
        type: getHkgId(category),
        message: topicId,
      });
      return url.href();
    }
    case 'LIHKG': {
      const url = new URI(`thread/${topicId}`, LIHKG_HOST);
      return url.href();
    }
    default:
      return undefined;
  }
}

function getForumName(forum) {
  switch (forum) {
    case 'HKG':
      return '高登';
    case 'LIHKG':
      return 'LIHKG';
    default:
      return forum;
  }
}

export default function Topic({
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
}) {
  return ({
    topicId: String(topicId),
    forum: String(forum),
    category: Number(category),
    title: String(title),
    createdDate: Number(createdDate),
    authorId: String(authorId),
    authorName: String(authorName),
    authorGender: String(authorGender),
    lastReplyDate: Number(lastReplyDate),
    totalReplies: Number(totalReplies),
    like: Number(like),
    dislike: Number(dislike),
    totalPage: Number(totalPage),
    href: getHref({
      forum: String(forum),
      category: Number(category),
      topicId: String(topicId),
    }),
    forumName: getForumName(String(forum)),
  });
}
