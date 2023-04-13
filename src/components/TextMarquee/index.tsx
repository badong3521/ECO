import { Animated, Dimensions, Easing, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Text, { TextPropType } from '../Text';

const screenWidth = Dimensions.get('screen').width;
const durationOffset = 25; // running duration for each pixel

// Text will run looping right to left
export default function TextMarquee(props: TextPropType) {
  const { children, style, fontSize } = props;
  const [textWidth, setTextWidth] = useState<number>(screenWidth);
  const [marginLeft, setMarginLeft] = useState<number>();
  const [scrollWidth, setScrollWidth] = useState<number>(screenWidth);
  const animatedValue = new Animated.Value(screenWidth);

  function animate() {
    if (children && children.length > 0 && textWidth > scrollWidth) {
      setMarginLeft(undefined);
      animatedValue.setValue(scrollWidth);
      Animated.timing(animatedValue, {
        toValue: -textWidth,
        duration: (scrollWidth + textWidth) * durationOffset,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }: any) => {
        if (finished) {
          animate();
        }
      });
    } else {
      animatedValue.setValue(0);
      setMarginLeft(scrollWidth - textWidth);
    }
  }

  useEffect(() => {
    animate();
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      onLayout={e => {
        setScrollWidth(e.nativeEvent.layout.width);
      }}
    >
      <Animated.View
        style={[
          {
            transform: [{ translateX: animatedValue }],
            marginLeft,
            width: null,
            alignSelf: 'center',
          },
        ]}
      >
        <Text
          numberOfLines={1}
          onLayout={e => {
            setTextWidth(e.nativeEvent.layout.width);
          }}
          fontSize={fontSize}
          style={style}
        >
          {children}
        </Text>
      </Animated.View>
    </ScrollView>
  );
}
