import { Multilanguage } from './api';

export interface Tooltip {
  id: number;
  title: Multilanguage;
  description?: Multilanguage;
  menuType: 'profile' | 'bus' | 'home';
}
