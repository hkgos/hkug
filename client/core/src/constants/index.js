/* eslint-env browser */
export const HKG_API_ENDPOINT_WEB = process.env.PROXY ?
  new URL('/hkg-api-web/', window.location.origin).href : 'https://web.hkgolden.com/api/';
export const HKG_API_ENDPOINT_MOBILE = process.env.PROXY ?
  new URL('/hkg-api-android/', window.location.origin).href : 'https://api-1.hkgolden.com/';
export const LIHKG_API_ENDPOINT = 'https://lihkg.com/api_v2/';
export const HKG_HOST = 'https://forum.hkgolden.com/';
export const LIHKG_HOST = 'https://lihkg.com/';
export const HKG_MEMBER_ICONS_BASE = 'https://forum.hkgolden.com/icons/';
export const API_TIMEOUT = 10000;
