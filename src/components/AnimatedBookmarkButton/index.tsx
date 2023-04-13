import { TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import React, { RefObject } from 'react';
import { applicationColors } from '../../../style.css';

interface PropTypes {
  onPress: () => void;
  lottieRef: RefObject<LottieView>;
  containerStyle?: ViewStyle | ViewStyle[];
  size?: number;
}

const color = applicationColors.secondary.shade500;

const FAVORITE_ANIMATION = require('../../assets/animation/favorite.json');

export default function AnimatedBookmarkButton(props: PropTypes) {
  const { onPress, containerStyle, size = 30, lottieRef } = props;
  const bannerLayers = [100, 300, 500].map((item, index) => ({
    keypath: `Banner ${index + 1}`,
    // @ts-ignore
    color: applicationColors.secondary[`shade${item}`],
  }));
  const circleLayers = new Array(8).fill(0).map((_item, index) => ({
    keypath: `Circle ${index + 1}`,
    color,
  }));
  const colorFilters = [
    ...bannerLayers,
    ...circleLayers,
    { keypath: 'Outline', color },
  ];

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={containerStyle}>
        <LottieView
          ref={lottieRef}
          source={FAVORITE_ANIMATION}
          autoPlay
          loop={false}
          style={{
            height: size,
          }}
          colorFilters={colorFilters}
          speed={3}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
