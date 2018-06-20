const categories = [
  {
    id: 1,
    hkgId: 'BW',
    lihkgId: 1,
    name: '吹水台',
  },
  {
    id: 2,
    hkgId: 'HT',
    lihkgId: 2,
    name: '熱門',
  },
  {
    id: 3,
    hkgId: 'NW',
    lihkgId: 3,
    name: '最新',
  },
  {
    id: 4,
    hkgId: 'MP',
    lihkgId: 4,
    name: '手機台',
  },
  {
    id: 5,
    hkgId: 'CA',
    lihkgId: 5,
    name: '時事台',
  },
  {
    id: 6,
    hkgId: 'SP',
    lihkgId: 6,
    name: '體育台',
  },
  {
    id: 7,
    hkgId: 'ET',
    lihkgId: 7,
    name: '娛樂台',
  },
  {
    id: 8,
    hkgId: 'AN',
    lihkgId: 8,
    name: '動漫台',
  },
  {
    id: 9,
    hkgId: 'AP',
    lihkgId: 9,
    name: 'Apps台',
  },
  {
    id: 10,
    hkgId: 'GM',
    lihkgId: 10,
    name: '遊戲台',
  },
  {
    id: 11,
    hkgId: 'VI',
    lihkgId: 11,
    name: '影視台',
  },
  {
    id: 12,
    hkgId: 'SY',
    lihkgId: 12,
    name: '講故台',
  },
  {
    id: 13,
    hkgId: 'CO',
    lihkgId: 13,
    name: '潮流台',
  },
  {
    id: 14,
    hkgId: 'WK',
    lihkgId: 14,
    name: '上班台',
  },
  {
    id: 15,
    hkgId: 'FN',
    lihkgId: 15,
    name: '財經台',
  },
  {
    id: 16,
    hkgId: 'ED',
    lihkgId: 16,
    name: '飲食台',
  },
  {
    id: 17,
    hkgId: 'TR',
    lihkgId: 17,
    name: '旅遊台',
  },
  {
    id: 18,
    hkgId: 'ST',
    lihkgId: 18,
    name: '學術台',
  },
  {
    id: 19,
    hkgId: 'SC',
    lihkgId: 19,
    name: '校園台',
  },
  {
    id: 20,
    hkgId: 'TS',
    lihkgId: 20,
    name: '汽車台',
  },
  {
    id: 21,
    hkgId: 'MU',
    lihkgId: 21,
    name: '音樂台',
  },
  {
    id: 22,
    hkgId: 'HW',
    lihkgId: 22,
    name: '硬件台',
  },
  {
    id: 23,
    hkgId: 'DC',
    lihkgId: 23,
    name: '攝影台',
  },
  {
    id: 24,
    hkgId: 'TO',
    lihkgId: 24,
    name: '玩具台',
  },
  {
    id: 25,
    hkgId: 'PT',
    lihkgId: 25,
    name: '寵物台',
  },
  {
    id: 26,
    hkgId: 'SW',
    lihkgId: 26,
    name: '軟件台',
  },
  {
    id: 27,
    hkgId: 'AC',
    lihkgId: 27,
    name: '活動台',
  },
  {
    id: 28,
    hkgId: 'MB',
    lihkgId: 28,
    name: '站務台',
  },
  {
    id: 29,
    hkgId: 'AU',
    lihkgId: 29,
    name: '成人台',
  },
  {
    id: 30,
    hkgId: 'LV',
    lihkgId: 30,
    name: '感情台',
  },
  {
    id: 31,
    hkgId: 'EP',
    lihkgId: 31,
    name: '創意台',
  },
  {
    id: 32,
    hkgId: 'OP',
    lihkgId: 32,
    name: '考古台',
  },
  {
    id: 33,
    lihkgId: 33,
    name: '政事台',
  },
  {
    id: 34,
    hkgId: 'JT',
    lihkgId: 34,
    name: '直播台',
  },
  {
    id: 35,
    hkgId: 'IN',
    lihkgId: 35,
    name: '電訊台',
  },
  {
    id: 36,
    lihkgId: 36,
    name: '健康台',
  },
  {
    id: 37,
    hkgId: 'BB',
    name: '親子台',
  },
  {
    id: 38,
    hkgId: 'RA',
    name: '電台',
  },
  {
    id: 39,
    hkgId: 'BS',
    name: '買賣台',
  },
];

export function getHkgId(id) {
  const cast = Number(id);
  if (!cast) {
    return null;
  }
  const category = categories.find(c => c.id === cast);
  return category ? category.hkgId : null;
}

export function getLihkgId(id) {
  const cast = Number(id);
  if (!cast) {
    return null;
  }
  const category = categories.find(c => c.id === cast);
  return category ? category.lihkgId : null;
}

export function getCategoryName(id) {
  const cast = Number(id);
  if (!cast) {
    return null;
  }
  const category = categories.find(c => c.id === cast);
  return category ? category.name : null;
}

export default categories;
