import { Capsule, Employee } from '../types';

export const mockEmployees: Employee[] = Array(30)
  .fill(null)
  .map((_, index) => ({
    id: `emp-${index + 1}`,
    name: `Employee ${index + 1}`,
  }));

export const mockCapsules: Capsule[] = [
  {
    id: 'ispirazione-ristretto',
    name: 'Ispirazione Ristretto',
    intensity: 10,
    price: 139,
    imageUrl: 'https://www.nespresso.com/ecom/medias/sys_master/public/12410046275614/Desktop-Standard-2000x2000.png',
    category: 'original'
  },
  {
    id: 'ispirazione-firenze',
    name: 'Ispirazione Firenze Arpeggio',
    intensity: 9,
    price: 139,
    imageUrl: 'https://www.nespresso.com/ecom/medias/sys_master/public/12827872526366/Desktop-Standard-2000x2000.png',
    category: 'original'
  },
  {
    id: 'ispirazione-roma',
    name: 'Ispirazione Roma',
    intensity: 8,
    price: 139,
    imageUrl: 'https://www.nespresso.com/ecom/medias/sys_master/public/12827873508382/Desktop-Standard-2000x2000.png',
    category: 'original'
  },
  {
    id: 'cape-town-lungo',
    name: 'Cape Town Envivo Lungo',
    intensity: 10,
    price: 139,
    imageUrl: 'https://www.nespresso.com/ecom/medias/sys_master/public/12827873639454/Desktop-Standard-2000x2000.png',
    category: 'original'
  },
  {
    id: 'stockholm-lungo',
    name: 'Stockholm Fortissio Lungo',
    intensity: 8,
    price: 139,
    imageUrl: 'https://www.nespresso.com/ecom/medias/sys_master/public/12827877047326/Desktop-Standard-2000x2000.png',
    category: 'original'
  },
  {
    id: 'tokyo-vivalto-lungo',
    name: 'Tokyo Vivalto Lungo',
    intensity: 6,
    price: 139,
    imageUrl: 'https://www.nespresso.com/ecom/medias/sys_master/public/12827877866526/Desktop-Standard-2000x2000.png',
    category: 'original'
  },
  {
    id: 'volluto',
    name: 'Volluto',
    intensity: 4,
    price: 139,
    imageUrl: 'https://www.nespresso.com/ecom/medias/sys_master/public/12844047171614/Desktop-Standard-2000x2000.png',
    category: 'original'
  },
  {
    id: 'cosi',
    name: 'Cosi',
    intensity: 3,
    price: 139,
    imageUrl: 'https://www.nespresso.com/ecom/medias/sys_master/public/12827865319454/Desktop-Standard-2000x2000.png',
    category: 'original'
  },
  {
    id: 'vanilla-eclair',
    name: 'Vanilla Éclair',
    intensity: 6,
    price: 159,
    imageUrl: 'https://www.nespresso.com/ecom/medias/sys_master/public/12894862319646/Desktop-Standard-2000x2000.png',
    category: 'original'
  },
  {
    id: 'caramel-creme-brulee',
    name: 'Caramel Crème Brûlée',
    intensity: 6,
    price: 159,
    imageUrl: 'https://www.nespresso.com/ecom/medias/sys_master/public/12894861271070/Desktop-Standard-2000x2000.png',
    category: 'original'
  },
  {
    id: 'vertuo-altissio',
    name: 'Altissio',
    intensity: 9,
    price: 179,
    imageUrl: 'https://www.nespresso.com/ecom/medias/sys_master/public/12807591641118/Desktop-Standard-2000x2000.png',
    category: 'vertuo'
  },
  {
    id: 'vertuo-stormio',
    name: 'Stormio',
    intensity: 8,
    price: 179,
    imageUrl: 'https://www.nespresso.com/ecom/medias/sys_master/public/10589733191710/Desktop-Standard-2000x2000.png',
    category: 'vertuo'
  }
];