import { CardType } from '../components/Card/types';

const PHOTO_ORIENTATIONS = ['vertical', 'horizontal'];

// eslint-disable-next-line import/prefer-default-export
export function randomizeCardOrientation(card: CardType): CardType {
  if (card.photoCover) {
    const orientation =
      PHOTO_ORIENTATIONS[Math.floor(Math.random() * PHOTO_ORIENTATIONS.length)];
    switch (orientation) {
      case 'vertical':
        return {
          ...card,
          aspectRatio: 3 / 4,
          photoCover: card.photoCover,
        };
      case 'horizontal':
        return {
          ...card,
          aspectRatio: 4 / 3,
          photoCover: card.photoCover,
        };
      default:
        return card;
    }
  } else {
    const { height, width } = card.photoDimensions;
    const ogAspectRatio = width / height;
    const hTest = Math.abs(4 / 3 - ogAspectRatio);
    const vTest = Math.abs(3 / 4 - ogAspectRatio);
    const aspectRatio = Math.min(hTest, vTest);
    if (aspectRatio === hTest) {
      return {
        ...card,
        aspectRatio: 4 / 3,
        photoCover: card.photoCover,
      };
    }
    return {
      ...card,
      aspectRatio: 3 / 4,
      photoCover: card.photoCover,
    };
  }
}

export interface ListRef {
  onRefresh: () => Promise<any> | void;
  onEndReached: () => Promise<any> | void;
}
