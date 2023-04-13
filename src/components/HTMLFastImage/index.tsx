import React, { useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './style.css';
import { applicationDimensions } from '../../../style.css';

const PLACEHOLDER_IMAGE = require('../../assets/images/placeholder-image.png');

const MAX_WIDTH =
  Dimensions.get('screen').width - applicationDimensions.defaultPadding * 2;
const MIN_WIDTH = MAX_WIDTH / 2;
export default function HTMLFastImage(props: any) {
  const { source } = props;
  const [size, setSize] = useState<{
    width: number;
    height: number;
  }>({
    width: MIN_WIDTH,
    height: MIN_WIDTH,
  });
  const [loaded, setLoaded] = useState<boolean>(false);

  function onLoad() {
    // if image is too small, keep ratio, otherwise scale it to match width screen
    Image.getSize(
      source,
      (w, h) => {
        if (w < MIN_WIDTH) {
          setSize({
            width: w,
            height: h,
          });
        } else {
          const aspectRatio = w / h;
          const calculatedHeight = MAX_WIDTH / aspectRatio;
          setSize({
            width: MAX_WIDTH,
            height: calculatedHeight,
          });
        }
        setLoaded(true);
      },
      () => null,
    );
  }

  return (
    <View>
      <View style={[styles.container, { height: size?.height }]}>
        <FastImage
          source={{ uri: source }}
          onLoad={onLoad}
          style={{ width: size?.width, height: size?.height }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      {!loaded && (
        <FastImage source={PLACEHOLDER_IMAGE} style={styles.placeholder} />
      )}
    </View>
  );
}
