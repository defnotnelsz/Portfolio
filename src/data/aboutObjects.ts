export interface RoomObjectData {
  id: 'cat' | 'rabbit' | 'cookies' | 'icedcoffee' | 'journal' | 'guitar';
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
      "I have four cats, and honestly, I can't imagine my life without them. Taking care of them and seeing them happy and healthy makes me happy too. They're a big part of my everyday life, and I love them more than words can explain. I think they're one of the things that make me who I am.",
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
      "I have three bunnies that were given to me by my partner as birthday and Christmas gift. At first, I thought taking care of them would be just like taking care of my cats, but I soon realized how different they are. They're like little stuffed toys that follow me around and sometimes even sleep beside me. They're also active at night, so I let them sleep in their cage for safety. I love watching their little habits and seeing how they have their own ways of showing their personality.",
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
    position: [-1.70, 0.6392, -2.12],
    rotation: [0, 0.35, 0],
    scale: 0.13,
    focusTarget: [-1.70, 0.72, -2.12],
    focusPosition: [-0.98, 1.15, -1.42],
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
    position: [-1.62, 0.6392, -1.68],
    rotation: [0, -0.4, 0],
    scale: 0.07,
    focusTarget: [-1.62, 0.75, -1.68],
    focusPosition: [-0.95, 1.15, -1.05],
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
    position: [-0.28, 0.6392, -3.50],
    rotation: [0, -0.15, 0],
    scale: 0.0011,
    focusTarget: [-0.28, 0.70, -3.50],
    focusPosition: [0.45, 1.15, -2.85],
    textPosition: 'top-left',
  },
  {
    id: 'guitar',
    number: '06',
    name: 'ACOUSTIC GUITAR',
    shortLabel: 'Guitar',
    category: '06 // MUSIC & RELAXATION',
    modelPath: '',
    story:
      "I've loved playing the guitar since I was 13, and it's become one of the things I enjoy most. It's my way of relaxing, expressing my feelings, and enjoying my own little moments. No matter how busy life gets, picking up my guitar always feels special to me.",
    position: [-2.04, 1.575, -3.27],
    rotation: [0, 0, 0],
    scale: 1,
    focusTarget: [-2.04, 1.55, -3.27],
    focusPosition: [-0.10, 1.65, -2.10],
    textPosition: 'top-right',
  },
];
