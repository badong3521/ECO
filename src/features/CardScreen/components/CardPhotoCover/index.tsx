import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions, View } from 'react-native';
import React from 'react';
import { getStatusBarHeight } from 'utils/statusBar';
import styles from '../../style.css';
import Image from '../../../../components/Image';

interface CardImageCoverProps {
  photoCover?: string;
  type: string;
}

// Contains the cover photo of card, with the covered grey gradient
export default function CardImageCover(props: CardImageCoverProps) {
  const { photoCover, type } = props;

  // the aspect ratio if background is under statusBar
  const aspectRatio =
    ASPECT_RATIO_TYPES[type] > 1
      ? ASPECT_RATIO_TYPES[type] *
        (1 - getStatusBarHeight() / Dimensions.get('screen').width)
      : ASPECT_RATIO_TYPES[type];

  return (
    <View>
      {photoCover && (
        <Image
          style={[
            styles.backgroundImage,
            {
              aspectRatio,
            },
          ]}
          uri={photoCover}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}
      {type === 'CardMerchant' && (
        <LinearGradient
          colors={['transparent', '#0f0f0f']}
          start={{ x: 0, y: 0.4 }}
          end={{ x: 0, y: 1.1 }}
          style={[
            styles.backgroundImageContainer,
            {
              aspectRatio: type ? ASPECT_RATIO_TYPES[type] : 2,
            },
          ]}
        />
      )}
      {photoCover && (
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'transparent']}
          end={{ x: 0, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={[styles.topGradient]}
        />
      )}
    </View>
  );
}

export const ASPECT_RATIO_TYPES: { [key: string]: number } = {
  CardMerchant: 1,
  CardEvent: 2,
  CardNews: 16 / 9,
};
