import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../style.css';

export default EStyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    ...applicationStyle.iconShadow,
  },
  square: {
    borderRadius: applicationDimensions.squareBorderRadius,
    backgroundColor: applicationColors.primary.white,
  },
  circle: {
    ...applicationStyle.shadow,
    borderRadius: 50,
    backgroundColor: applicationColors.primary.white,
    margin: applicationDimensions.smallPadding,
  },
});
