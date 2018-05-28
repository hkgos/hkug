import React from 'react';
import xmldom from 'xmldom';
import { HKG_HOST, LIHKG_HOST, HKG_MEMBER_ICONS_BASE } from '../constants';

function createReactElements(nodes, forum) {
  if (nodes.length === 0) {
    return [];
  }
  const result = [];
  let index = 0;
  while (nodes.length > index) {
    const n = nodes.item(index);
    if (n.nodeType === 1) {
      const attrsLength = n.attributes.length;
      const props = {};
      for (let i = 0; i < attrsLength; i += 1) {
        props[n.attributes.item(i).name] = n.attributes.item(i).value;
      }
      if (forum === 'HKG') {
        if (props.src && props.src.startsWith('/faces/') && n.tagName === 'img') {
          const url = new URL(props.src, HKG_HOST);
          props.src = url.href;
        }
      } else if (forum === 'LIHKG') {
        if (n.tagName === 'img' && props.class === 'hkgmoji') {
          const url = new URL(props.src, LIHKG_HOST);
          props.src = url.href;
        }
      }
      delete props.class;
      delete props.style;
      result.push(React.createElement(
        n.tagName.toLowerCase(),
        props,
        ...createReactElements(n.childNodes, forum),
      ));
    } else {
      result.push(n.nodeValue);
    }
    index += 1;
  }
  return result;
}

export default class Reply {
  constructor({
    replyId,
    forum,
    index,
    authorId,
    authorName,
    authorGender,
    authorIcon,
    content,
    replyDate,
  } = {}) {
    this.parser = new xmldom.DOMParser();
    this.replyId = String(replyId);
    this.forum = String(forum);
    this.index = Number(index);
    this.authorId = String(authorId);
    this.authorName = String(authorName);
    this.authorGender = String(authorGender);
    this.authorIcon = authorIcon && String(authorIcon);
    this.content = String(content);
    this.replyDate = new Date(Number(replyDate));
  }

  get hasIcon() {
    if (this.forum === 'HKG') {
      if (this.authorIcon && this.authorIcon !== '1') {
        return true;
      }
    }
    return false;
  }

  get authorIconHref() {
    if (this.forum === 'HKG' && this.hasIcon) {
      const url = new URL(`${this.authorIcon}.gif`, HKG_MEMBER_ICONS_BASE);
      return url.href;
    }
    return undefined;
  }

  contentReactElement(className) {
    const doc = this.parser.parseFromString(this.content, 'text/html');
    const childrens = createReactElements(doc.childNodes, this.forum);
    return React.createElement(
      'div',
      { className },
      ...childrens,
    );
  }
}
