import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { useValue } from 'react-native-redash';
import styles, {
  containerSize,
  iconContainerSize,
  imageSize,
  shadowHeight,
  shadowWidth,
} from './style.css';
import Text from '../../../../components/Text';
import CategoryShadow from '../../../../assets/home/category_shadow.svg';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';
import Image from '../../../../components/Image';

interface MerchantCategoryItemProps {
  id?: number;
  image: string | React.ReactNode;
  title: string;
  shadow?: boolean;
  onPress: (id?: number) => void;
  customImageSize?: number;
  selectable?: boolean;
  selected?: boolean;
  backgroundColor?: string;
}

const pressingScale = 0.75;
const duration = 120;

// Category Item in The Categories List
// Containing title and svg image url
function MerchantCategoryItem(props: MerchantCategoryItemProps) {
  const {
    id,
    image,
    title,
    onPress,
    shadow,
    customImageSize,
    selectable,
    selected,
    backgroundColor,
  } = props;
  const pinchAnimate = useValue(1);
  // const [selected, setSelected] = useState<boolean>(false);
  const size = selected ? iconContainerSize : iconContainerSize * (2 / 3);
  const borderRadius = selected
    ? applicationDimensions.squareBorderRadius
    : size;
  const background = selectable ? backgroundColor : 'transparent';

  function onTouchStart() {
    Animated.timing(pinchAnimate, {
      toValue: pressingScale,
      duration,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }

  function onTouchEnd() {
    Animated.timing(pinchAnimate, {
      toValue: 1,
      duration,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }

  function onPressHandler() {
    onPress(id);
  }

  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <View
        style={styles.container}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        onTouchEndCapture={onTouchEnd}
      >
        <Animated.View
          style={[
            styles.icon,
            {
              transform: [
                {
                  scale: pinchAnimate,
                },
              ],
              top: customImageSize
                ? (containerSize - customImageSize) / 2 - 10
                : (containerSize - imageSize) / 2 - 10,
            },
          ]}
        >
          {typeof image === 'string' ? (
            <Image
              style={[
                styles.image,
                {
                  width: customImageSize || imageSize,
                  height: customImageSize || imageSize,
                },
              ]}
              uri={image}
              resizeMode="contain"
            />
          ) : (
            image
          )}
        </Animated.View>

        <View
          style={{
            width: iconContainerSize,
            height: iconContainerSize,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: size,
              height: size,
              borderRadius,
              backgroundColor: background,
            }}
          />
        </View>

        {shadow && (
          <Animated.View
            style={{
              transform: [
                {
                  scale: pinchAnimate,
                },
              ],
            }}
          >
            <CategoryShadow
              height={shadowHeight}
              width={shadowWidth}
              preserveAspectRatio="none"
            />
          </Animated.View>
        )}
        <Text
          fontSize="tiny"
          style={[
            styles.text,
            {
              color:
                selectable && selected
                  ? applicationColors.primary.shade900
                  : undefined,
            },
          ]}
        >
          {title.replace('\\n', '\n')}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default React.memo(
  MerchantCategoryItem,
  (prevProps, nextProps) =>
    nextProps.title === prevProps.title &&
    nextProps.image === prevProps.image &&
    nextProps.selected === prevProps.selected &&
    nextProps.onPress === prevProps.onPress &&
    nextProps.id === prevProps.id,
);
