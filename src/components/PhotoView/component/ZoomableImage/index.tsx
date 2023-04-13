import React from 'react';
import { Animated } from 'react-native';
import Image from '../../../Image';
import styles from '../../style.css';

interface ZoomableImageProps {
  uri: string;
  translateY?: any;
}

// The image can zoom out/in by pinch gesture
export default function ZoomableImage(props: ZoomableImageProps) {
  const { uri, translateY } = props;

  return (
    <Animated.View
      style={[
        styles.image,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <Image uri={uri} style={styles.image} resizeMode="contain" />
    </Animated.View>
  );
}
