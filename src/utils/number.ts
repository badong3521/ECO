import { LanguageType } from '../features/User/reducers';

// eslint-disable-next-line import/prefer-default-export
export function getNumberString(number: number, locale?: LanguageType): string {
  switch (locale) {
    case 'vn':
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    case 'en':
    default:
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
