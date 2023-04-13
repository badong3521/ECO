import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import CouponIcon from '../../../../../../assets/directory/icon_coupon.svg';
import styles from '../../style.css';

interface AnimatedPromotionIconProps {
  value: Animated.Value;
  interpolate: any;
}

// Promotion Icon can change color when animating
export default function AnimatedPromotionIcon(
  props: AnimatedPromotionIconProps,
) {
  const { value, interpolate } = props;
  const [fillColor, setFillColor] = useState<string>();

  useEffect(() => {
    value.addListener(() => {
      /* eslint-disable-next-line no-underscore-dangle */
      setFillColor(interpolate.__getValue());
    });
  }, []);
  return (
    <View style={styles.promotionIndicator}>
      <CouponIcon fill={fillColor} width={25} height={20} />
    </View>
  );
}
