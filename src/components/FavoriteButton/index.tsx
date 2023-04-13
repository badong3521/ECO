import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { TouchableWithoutFeedback, View } from 'react-native';
import styles from './style.css';
import { applicationColors } from '../../../style.css';

const FAVORITE_ANIMATION = require('../../assets/animation/favorite.json');

const animateDuration = 1100;

interface FavoriteButtonProps {
  favorited?: boolean;
  onFavorite: (favorited: boolean) => void;
  outlineColor?: string;
}

// Animate favorite button by lottie
export default function FavoriteButton(props: FavoriteButtonProps) {
  const {
    favorited,
    onFavorite,
    outlineColor = applicationColors.primary.white,
  } = props;
  const lottieRef = React.createRef<LottieView>();
  const filterColor = favorited
    ? applicationColors.secondary.shade500
    : outlineColor;
  function onPress() {
    onFavorite(!favorited);
  }

  // animate lottie when is favorited
  useEffect(() => {
    if (favorited) {
      lottieRef.current!.play();
    }
  }, [favorited]);
  const bannerLayers = new Array(3).fill(0).map((item, index) => ({
    keypath: `Banner ${index + 1}`,
    color: filterColor,
  }));
  const circleLayers = new Array(8).fill(0).map((item, index) => ({
    keypath: `Circle ${index + 1}`,
    color: filterColor,
  }));
  const colorFilters = [
    ...bannerLayers,
    ...circleLayers,
    { keypath: 'Outline', color: filterColor },
  ];

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <LottieView
          ref={lottieRef}
          colorFilters={colorFilters}
          source={
            favorited
              ? FAVORITE_ANIMATION
              : {
                  ...FAVORITE_ANIMATION,
                  layers: FAVORITE_ANIMATION.layers.filter(
                    (data: any) => data.nm.indexOf('Banner') === -1,
                  ),
                }
          }
          loop={false}
          duration={animateDuration}
          progress={1}
          style={styles.favoriteIcon}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
