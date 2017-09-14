
export const regrowth = {
  name: 'Regrowth',
  description: 'heals direct and over time',
  direct: true,
  hot: true,
  // Coefficients https://github.com/elysium-project/server/pull/860
  coefficient: 0.325,
  hotCoefficient: 0.513,
  ranks: [
    { 'rank': 1, 'mana': 120, 'level': 12, 'castTime': 2, 'min': 84, 'max': 99, 'hot': 98, 'duration': 21 },
    { 'rank': 2, 'mana': 205, 'level': 18, 'castTime': 2, 'min': 164, 'max': 189, 'hot': 175, 'duration': 21 },
    { 'rank': 3, 'mana': 280, 'level': 24, 'castTime': 2, 'min': 240, 'max': 275, 'hot': 259, 'duration': 21 },
    { 'rank': 4, 'mana': 350, 'level': 30, 'castTime': 2, 'min': 318, 'max': 361, 'hot': 343, 'duration': 21 },
    { 'rank': 5, 'mana': 420, 'level': 36, 'castTime': 2, 'min': 405, 'max': 458, 'hot': 427, 'duration': 21 },
    { 'rank': 6, 'mana': 510, 'level': 42, 'castTime': 2, 'min': 511, 'max': 576, 'hot': 546, 'duration': 21 },
    { 'rank': 7, 'mana': 615, 'level': 48, 'castTime': 2, 'min': 646, 'max': 725, 'hot': 686, 'duration': 21 },
    { 'rank': 8, 'mana': 740, 'level': 54, 'castTime': 2, 'min': 809, 'max': 906, 'hot': 861, 'duration': 21 },
    { 'rank': 9, 'mana': 880, 'level': 60, 'castTime': 2, 'min': 1003, 'max': 1120, 'hot': 1064, 'duration': 21 },
  ],
};

export const healingTouch = {
  name: 'Healing Touch',
  description: 'heals direct',
  direct: true,
  hot: false,
  ranks: [
    { 'rank': 1, 'mana': 25, 'level': 1, 'castTime': 1.5, 'min': 37, 'max': 51, hot: 0 },
    { 'rank': 2, 'mana': 55, 'level': 8, 'castTime': 2, 'min': 88, 'max': 112, hot: 0 },
    { 'rank': 3, 'mana': 110, 'level': 14, 'castTime': 2.5, 'min': 195, 'max': 243, hot: 0 },
    { 'rank': 4, 'mana': 185, 'level': 20, 'castTime': 3, 'min': 363, 'max': 445, hot: 0 },
    { 'rank': 5, 'mana': 270, 'level': 26, 'castTime': 3.5, 'min': 572, 'max': 694, hot: 0 },
    { 'rank': 6, 'mana': 335, 'level': 32, 'castTime': 3.5, 'min': 742, 'max': 894, hot: 0 },
    { 'rank': 7, 'mana': 405, 'level': 38, 'castTime': 3.5, 'min': 936, 'max': 1120, hot: 0 },
    { 'rank': 8, 'mana': 495, 'level': 44, 'castTime': 3.5, 'min': 1199, 'max': 1427, hot: 0 },
    { 'rank': 9, 'mana': 600, 'level': 50, 'castTime': 3.5, 'min': 1516, 'max': 1796, hot: 0 },
    { 'rank': 10, 'mana': 720, 'level': 56, 'castTime': 3.5, 'min': 1890, 'max': 2230, hot: 0 },
  ],
};

export const rejuvenation = {
  name: 'Rejuvenation',
  description: 'heals over time',
  direct: false,
  hot: true,
  ranks: [
    { 'rank': 1, 'mana': 25, 'level': 4, 'castTime': 1.5, 'hot': 32, 'duration': 15 },
    { 'rank': 2, 'mana': 40, 'level': 10, 'castTime': 1.5, 'hot': 56, 'duration': 15 },
    { 'rank': 3, 'mana': 75, 'level': 16, 'castTime': 1.5, 'hot': 116, 'duration': 15 },
    { 'rank': 4, 'mana': 105, 'level': 22, 'castTime': 1.5, 'hot': 180, 'duration': 15 },
    { 'rank': 5, 'mana': 135, 'level': 28, 'castTime': 1.5, 'hot': 244, 'duration': 15 },
    { 'rank': 6, 'mana': 160, 'level': 34, 'castTime': 1.5, 'hot': 304, 'duration': 15 },
    { 'rank': 7, 'mana': 195, 'level': 40, 'castTime': 1.5, 'hot': 388, 'duration': 15 },
    { 'rank': 8, 'mana': 235, 'level': 46, 'castTime': 1.5, 'hot': 488, 'duration': 15 },
    { 'rank': 9, 'mana': 280, 'level': 52, 'castTime': 1.5, 'hot': 608, 'duration': 15 },
    { 'rank': 10, 'mana': 335, 'level': 58, 'castTime': 1.5, 'hot': 756, 'duration': 15 },
    { 'rank': 11, 'mana': 360, 'level': 60, 'castTime': 1.5, 'hot': 888, 'duration': 15 },
  ],
};

export const flashHeal = {
  name: 'Flash Heal',
  description: 'flash heal',
  direct: true,
  hot: false,
  ranks: [
    { 'rank': 1, 'mana': 125, 'level': 20, 'castTime': 1.5, 'min': 193, 'max': 238, hot: 0 },
    { 'rank': 2, 'mana': 155, 'level': 26, 'castTime': 1.5, 'min': 258, 'max': 315, hot: 0 },
    { 'rank': 3, 'mana': 185, 'level': 32, 'castTime': 1.5, 'min': 327, 'max': 394, hot: 0 },
    { 'rank': 4, 'mana': 215, 'level': 38, 'castTime': 1.5, 'min': 400, 'max': 479, hot: 0 },
    { 'rank': 5, 'mana': 265, 'level': 44, 'castTime': 1.5, 'min': 518, 'max': 617, hot: 0 },
    { 'rank': 6, 'mana': 315, 'level': 50, 'castTime': 1.5, 'min': 644, 'max': 765, hot: 0 },
    { 'rank': 7, 'mana': 380, 'level': 56, 'castTime': 1.5, 'min': 812, 'max': 959, hot: 0 },
  ],
};

export const flashOfLight = {
  name: 'Flash Of LIght',
  description: 'flash of Light',
  direct: true,
  hot: false,
  ranks: [
  { 'rank': 1, 'mana': 35, 'level': 20, 'castTime': 1.5, 'min': 62, 'max': 73, hot: 0 },
  { 'rank': 2, 'mana': 50, 'level': 26, 'castTime': 1.5, 'min': 96, 'max': 111, hot: 0 },
  { 'rank': 3, 'mana': 70, 'level': 34, 'castTime': 1.5, 'min': 145, 'max': 164, hot: 0 },
  { 'rank': 4, 'mana': 90, 'level': 42, 'castTime': 1.5, 'min': 197, 'max': 222, hot: 0 },
  { 'rank': 5, 'mana': 115, 'level': 50, 'castTime': 1.5, 'min': 267, 'max': 300, hot: 0 },
  { 'rank': 6, 'mana': 140, 'level': 58, 'castTime': 1.5, 'min': 343, 'max': 384, hot: 0 },
  ],
};

export const renew = {
  name: 'Renew',
  description: 'renew',
  direct: false,
  hot: true,
  ranks: [
  { 'rank': 1, 'mana': 30, 'level': 8, 'castTime': 1.5, 'hot': 45 },
  { 'rank': 2, 'mana': 65, 'level': 14, 'castTime': 1.5, 'hot': 100 },
  { 'rank': 3, 'mana': 105, 'level': 20, 'castTime': 1.5, 'hot': 175 },
  { 'rank': 4, 'mana': 140, 'level': 26, 'castTime': 1.5, 'hot': 245 },
  { 'rank': 5, 'mana': 170, 'level': 32, 'castTime': 1.5, 'hot': 315 },
  { 'rank': 6, 'mana': 205, 'level': 38, 'castTime': 1.5, 'hot': 400 },
  { 'rank': 7, 'mana': 250, 'level': 44, 'castTime': 1.5, 'hot': 510 },
  { 'rank': 7, 'mana': 305, 'level': 50, 'castTime': 1.5, 'hot': 650 },
  { 'rank': 7, 'mana': 365, 'level': 56, 'castTime': 1.5, 'hot': 810 },
  { 'rank': 7, 'mana': 410, 'level': 60, 'castTime': 1.5, 'hot': 970 },
  ],
};

export const greaterHeal = {
  name: 'Greater Heal',
  description: 'Greater Heal',
  direct: true,
  hot: false,
  ranks: [
  { 'rank': 1, 'mana': 370, 'level': 40, 'castTime': 3, 'min': 899, 'max': 1014, 'hot': 0 },
  { 'rank': 2, 'mana': 455, 'level': 46, 'castTime': 3, 'min': 1149, 'max': 1290, 'hot': 0 },
  { 'rank': 3, 'mana': 545, 'level': 52, 'castTime': 3, 'min': 1437, 'max': 1610, 'hot': 0 },
  { 'rank': 4, 'mana': 655, 'level': 58, 'castTime': 3, 'min': 1798, 'max': 2007, 'hot': 0 },
  { 'rank': 5, 'mana': 710, 'level': 60, 'castTime': 3, 'min': 1966, 'max': 2195, 'hot': 0 },
  ],
};