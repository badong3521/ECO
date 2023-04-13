import { ImageType } from '../features/VaccineRegistration/types';

export function urlToImageType(url?: string): ImageType | undefined {
  return url
    ? {
        uri: url,
        sgid: url,
      }
    : undefined;
}

export default {
  urlToImageType,
};
