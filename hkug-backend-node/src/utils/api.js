import { URL, URLSearchParams } from 'url';
import httpClient from './httpClient';

import {
  HKG_API_ENDPOINT,
  LIHKG_API_ENDPOINT,
} from '../constants';

export async function fetchHKGTopics({ category = 'BW', page = 1 } = {}) {
  const url = new URL(`topics/${category}/${page}`, HKG_API_ENDPOINT);
  const res = await httpClient.get(url.href);
  return res.data.list;
}

export async function fetchLIHKGTopics({ category = 1, page = 1 } = {}) {
  const url = new URL('thread/category', LIHKG_API_ENDPOINT);
  url.search = new URLSearchParams({
    cat_id: category,
    page,
  });
  const res = await httpClient.get(url.href);
  return res.response.items;
}
