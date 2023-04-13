import { LayoutAnimation } from 'react-native';

const CUSTOM_ANIMATE_SPRING = {
  duration: 200,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 1,
  },
};

export default {
  CUSTOM_ANIMATE_SPRING,
};
