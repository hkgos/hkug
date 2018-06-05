import React from 'react';
import URI from 'urijs';
import HtmlDomParser from 'html-dom-parser';
import { HKG_HOST, LIHKG_HOST, HKG_MEMBER_ICONS_BASE } from '../constants';

function createReactElements(nodes, forum) {
  if (nodes.length === 0) {
    return [];
  }
  const result = [];
  let index = 0;
  while (nodes.length > index) {
    const n = nodes[index];
    if (n.type === 'tag') {
      const props = { ...n.attribs };
      if (forum === 'HKG') {
        if (props.src && props.src.startsWith('/faces/') && n.name === 'img') {
          const url = new URI(props.src, HKG_HOST);
          props.src = url.href();
        }
      } else if (forum === 'LIHKG') {
        if (n.name === 'img' && props.class === 'hkgmoji') {
          const url = new URI(props.src, LIHKG_HOST);
          props.src = url.href();
        }
      }
      const style = {};
      const styles = typeof props.style === 'string' ? props.style.split(';') : [];
      styles.forEach((s) => {
        const [key, value] = s.split(':');
        if (key && value && key !== '' && value !== '') {
          style[key.trim()] = value.trim();
        }
      });
      delete props.style;
      delete props.class;
      if (Object.keys(style).length > 0) {
        props.style = style;
      }
      result.push(React.createElement(
        n.name,
        props,
        ...createReactElements(n.children, forum),
      ));
    } else if (n.type === 'text') {
      result.push(n.data);
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
    const nodes = HtmlDomParser(this.content);
    const childrens = createReactElements(nodes, this.forum);
    return React.createElement(
      'div',
      { className },
      ...childrens,
    );
  }
}
