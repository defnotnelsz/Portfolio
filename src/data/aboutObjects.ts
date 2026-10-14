export interface RoomObjectData {
  id: 'cat' | 'rabbit' | 'cookies' | 'icedcoffee' | 'journal';
  number: string;
  name: string;
  shortLabel: string;
  category: string;
  modelPath: string;
  story: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  focusTarget: [number, number, number];
  focusPosition: [number, number, number];
  textPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const ROOM_OBJECTS: RoomObjectData[] = [
  {
    id: 'cat',
    number: '01',
    name: 'MY CATS',
    shortLabel: 'Cat',
    category: '01 // 9 CATS & 2 BUNNIES',
    modelPath: '/models/cat.glb',
    story:
      "I have 9 cats and 2 bunnies, and honestly, I can't imagine my life without them. They're not just pets to me; they're a part of me and a big reason why my heart feels so full. Whenever I'm tired, stressed, or having a bad day, being around them makes me feel a little better. Even the smallest things they do can make me smile without realizing it. Taking care of them makes me happy, and seeing them safe, healthy, and comfortable means so much to me. I think having them is one of the things that defines who I am because of how much love I have for them. They're a part of my everyday life, my happiness, and the little things that make life more meaningful to me. I may have 11 pets, but to me, they're not just numbers. They're my babies, my comfort, and a kind of love I will always be grateful for.",
    position: [-0.65, 0.3576, -0.80],
    rotation: [0, Math.PI / 4, 0],
    scale: 0.12,
    focusTarget: [-0.65, 0.50, -0.80],
    focusPosition: [0.55, 1.00, 0.35],
    textPosition: 'top-left',
  },
  {
    id: 'rabbit',
    number: '02',
    name: 'MY BUNNIES',
    shortLabel: 'Rabbit',
    category: '02 // 9 CATS & 2 BUNNIES',
    modelPath: '/models/rabbit.glb',
    story:
      "I have 9 cats and 2 bunnies, and honestly, I can't imagine my life without them. They're not just pets to me; they're a part of me and a big reason why my heart feels so full. Whenever I'm tired, stressed, or having a bad day, being around them makes me feel a little better. Even the smallest things they do can make me smile without realizing it. Taking care of them makes me happy, and seeing them safe, healthy, and comfortable means so much to me. I think having them is one of the things that defines who I am because of how much love I have for them. They're a part of my everyday life, my happiness, and the little things that make life more meaningful to me. I may have 11 pets, but to me, they're not just numbers. They're my babies, my comfort, and a kind of love I will always be grateful for.",
    position: [0.15, -0.207, -1.75],
    rotation: [0, -Math.PI / 3, 0],
    scale: 3.6,
    focusTarget: [0.15, 0.05, -1.75],
    focusPosition: [1.15, 0.55, -0.85],
    textPosition: 'top-left',
  },
  {
    id: 'cookies',
    number: '03',
    name: 'SWEET TREATS & COOKIES',
    shortLabel: 'Cookies',
    category: '03 // COMFORT FOOD',
    modelPath: '/models/cookies.glb',
    story:
      "Cake and other sweet treats have always been my comfort food. Whether I'm stressed, happy, sad, or tired, having something sweet just makes me feel a little better. There's something about it that feels comforting no matter what kind of day I'm having.",
    position: [-1.65, 0.6392, -2.05],
    rotation: [0, 0.35, 0],
    scale: 0.13,
    focusTarget: [-1.65, 0.72, -2.05],
    focusPosition: [-0.95, 1.15, -1.35],
    textPosition: 'top-right',
  },
  {
    id: 'icedcoffee',
    number: '04',
    name: 'DAILY ICED COFFEE',
    shortLabel: 'Iced Coffee',
    category: '04 // DAILY RITUAL',
    modelPath: '/models/icedcoffee.glb',
    story:
      "Coffee is a must for me, too. There's hardly a day that goes by without me having a cup of coffee. It's part of my daily routine, and honestly, my day just feels incomplete without it.",
    position: [-1.65, 0.6392, -1.82],
    rotation: [0, -0.4, 0],
    scale: 0.07,
    focusTarget: [-1.65, 0.75, -1.82],
    focusPosition: [-0.95, 1.15, -1.15],
    textPosition: 'top-right',
  },
  {
    id: 'journal',
    number: '05',
    name: 'PERSONAL JOURNAL',
    shortLabel: 'Journal',
    category: '05 // THOUGHTS & REFLECTIONS',
    modelPath: '/models/journal.glb',
    story:
      "I love writing down my thoughts and feelings in my personal journal. It's not just about how I feel, but also about my daily progress, the things I've accomplished, and the lessons I've learned. I also keep track of my daily expenses to understand my spending habits, especially when there's something I really want to buy. It helps me think twice before spending, manage my money better, and see how I'm growing over time. For me, journaling is a way to understand myself better, appreciate the little things, and keep track of both my personal growth and daily life.",
    position: [-1.93, 0.6392, -2.10],
    rotation: [0, 0.12, 0],
    scale: 0.00095,
    focusTarget: [-1.93, 0.70, -2.10],
    focusPosition: [-1.20, 1.15, -1.40],
    textPosition: 'top-right',
  },
];
