import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
  scaleFactor,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  signUpForm: {
    ...applicationStyle.shadow,
    backgroundColor: applicationColors.secondary.background,
    borderTopLeftRadius: applicationDimensions.roundBorderRadius,
    borderTopRightRadius: applicationDimensions.roundBorderRadius,
    paddingLeft: applicationDimensions.defaultPadding * scaleFactor,
    paddingRight: applicationDimensions.defaultPadding * scaleFactor,
    paddingTop: applicationDimensions.defaultPadding * scaleFactor,
    marginTop: getStatusBarHeight(),
  },
});
