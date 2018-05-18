import React from 'react';
import moment from 'moment';
import { HKG_HOST, LIHKG_HOST, HKG_MEMBER_ICONS_BASE } from '../constants';

function createHKGReactElements(nodes) {
  if (nodes.length === 0) {
    return [];
  }
  const result = [];
  nodes.forEach((n) => {
    if (n instanceof Element) {
      const attrsLength = n.attributes.length;
      const props = {};
      for (let i = 0; i < attrsLength; i += 1) {
        props[n.attributes.item(i).name] = n.attributes.item(i).value;
      }
      if (props['data-icons'] && n.tagName === 'IMG') {
        const url = new URL(props.src, HKG_HOST);
        props.src = url.href;
      }
      result.push(React.createElement(
        n.tagName.toLowerCase(),
        props,
        ...createHKGReactElements(n.childNodes),
      ));
    } else {
      result.push(n.nodeValue);
    }
  });
  return result;
}

function createLIHKGReactElements(nodes) {
  if (nodes.length === 0) {
    return [];
  }
  const result = [];
  nodes.forEach((n) => {
    if (n instanceof Element) {
      const attrsLength = n.attributes.length;
      const props = {};
      for (let i = 0; i < attrsLength; i += 1) {
        props[n.attributes.item(i).name] = n.attributes.item(i).value;
      }
      if (n.tagName === 'IMG' && props.class === 'hkgmoji') {
        const url = new URL(props.src, LIHKG_HOST);
        props.src = url.href;
      }
      // TODO: handle the style
      delete props.class;
      delete props.style;
      result.push(React.createElement(
        n.tagName.toLowerCase(),
        props,
        ...createLIHKGReactElements(n.childNodes),
      ));
    } else {
      result.push(n.nodeValue);
    }
  });
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
    this.replyId = String(replyId);
    this.forum = forum;
    this.index = Number(index);
    this.authorId = String(authorId);
    this.authorName = authorName;
    this.authorGender = authorGender;
    this.authorIcon = String(authorIcon);
    this.content = content;
    this.replyDate = replyDate;
  }

  get replyMoment() {
    return moment(this.replyDate);
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
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.content, 'text/html');
    let childrens = [];
    if (this.forum === 'HKG') {
      childrens = createHKGReactElements(doc.body.childNodes);
    } else if (this.forum === 'LIHKG') {
      childrens = createLIHKGReactElements(doc.body.childNodes);
    }
    return React.createElement(
      'div',
      { className },
      ...childrens,
    );
  }
}
