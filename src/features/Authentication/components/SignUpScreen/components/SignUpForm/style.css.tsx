import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
  scaleFactor,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  signUpSection: {
    ...applicationStyle.shadow,
    backgroundColor: applicationColors.secondary.background,
    borderTopLeftRadius: applicationDimensions.roundBorderRadius,
    borderTopRightRadius: applicationDimensions.roundBorderRadius,
    paddingLeft: applicationDimensions.defaultPadding * scaleFactor,
    paddingRight: applicationDimensions.defaultPadding * scaleFactor,
    paddingTop: applicationDimensions.defaultPadding * scaleFactor,
    marginTop: getStatusBarHeight(),
    minHeight: '50%',
  },
  signInRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signInButton: {
    color: applicationColors.primary.shade900,
    padding: 5,
    textDecorationLine: null,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orSignInWidthContainer: {
    marginTop: applicationDimensions.smallPadding * scaleFactor,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorMessage: {
    color: applicationColors.semantic.error.shade500,
    flex: 1,
    textAlign: 'right',
  },
  createButton: {
    flex: 1,
  },
  createButtonInner: {
    borderRadius: 20,
    marginLeft: applicationDimensions.defaultPadding * scaleFactor,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20 * scaleFactor,
    marginLeft: -5,
  },
  checkbox: {
    width: applicationDimensions.iconSize,
    height: applicationDimensions.iconSize,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: applicationDimensions.smallPadding * scaleFactor,
    marginLeft: -5,
  },
  input: {
    flex: 1,
  },
  inputLastName: {
    flex: 1,
    marginLeft: applicationDimensions.smallPadding * scaleFactor,
  },
  contactUs: {
    alignItems: 'center',
    paddingBottom: 30 * scaleFactor,
  },
  hiThere: {
    flex: 1,
  },
});
