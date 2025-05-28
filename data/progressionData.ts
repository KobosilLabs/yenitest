import { ImageSourcePropType } from 'react-native';

export interface Arc {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isCheckpoint?: boolean;
  status: 'completed' | 'current' | 'locked';
}

export const arcs: Arc[] = [
  {
    id: 'arc-1',
    name: 'SHADOW RISING',
    description: 'Embrace the darkness within',
    imageUrl: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg',
    status: 'completed'
  },
  {
    id: 'arc-2',
    name: 'SILENT RESOLVE',
    description: 'Find strength in stillness',
    imageUrl: 'https://images.pexels.com/photos/1553962/pexels-photo-1553962.jpeg',
    status: 'completed'
  },
  {
    id: 'arc-3',
    name: 'BEAST MODE',
    description: 'Unleash your primal power',
    imageUrl: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
    isCheckpoint: true,
    status: 'completed'
  },
  {
    id: 'arc-4',
    name: 'REDEMPTION ARC',
    description: 'Rise from the ashes',
    imageUrl: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg',
    status: 'current'
  },
  {
    id: 'arc-5',
    name: 'CYBER MONK',
    description: 'Digital enlightenment awaits',
    imageUrl: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg',
    status: 'locked'
  },
  {
    id: 'arc-6',
    name: 'NEON WARRIOR',
    description: 'Light up the darkness',
    imageUrl: 'https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg',
    isCheckpoint: true,
    status: 'locked'
  },
  {
    id: 'arc-7',
    name: 'QUANTUM LEAP',
    description: 'Break through dimensions',
    imageUrl: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
    status: 'locked'
  },
  {
    id: 'arc-8',
    name: 'VOID WALKER',
    description: 'Navigate the unknown',
    imageUrl: 'https://images.pexels.com/photos/3075988/pexels-photo-3075988.jpeg',
    status: 'locked'
  },
  {
    id: 'arc-9',
    name: 'FINAL FORM',
    description: 'Achieve ultimate power',
    imageUrl: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg',
    isCheckpoint: true,
    status: 'locked'
  },
];