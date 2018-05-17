export const HKG_API_ENDPOINT = process.env.PROXY ?
  new URL('/hkg-api/', window.location.origin).href : 'https://web.hkgolden.com/api/';
export const LIHKG_API_ENDPOINT = 'https://lihkg.com/api_v2/';
export const HKG_VIEW_TOPIC_BASE = 'https://web.hkgolden.com/view/';
export const LIHKG_VIEW_TOPIC_BASE = 'https://lihkg.com/thread/';
export const API_TIMEOUT = 10000;
export const SIDE_MENU_BREAK_POINT = 992;
