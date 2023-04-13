import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: applicationColors.secondary.background,
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    textDecorationLine: null,
    marginTop: applicationDimensions.defaultPadding,
    lineHeight: applicationDimensions.defaultPadding,
  },
  signUp: {
    color: applicationColors.primary.shade900,
    padding: 10,
  },
  form: {
    padding: applicationDimensions.defaultPadding,
  },
  errorMessage: {
    color: applicationColors.semantic.error.shade500,
    marginTop: applicationDimensions.smallPadding,
    alignSelf: 'center',
  },
  signInButton: {
    borderRadius: 20,
    minWidth: applicationDimensions.singleButtonWidth,
    marginTop: applicationDimensions.defaultPadding,
    alignSelf: 'center',
  },
  forgotPassword: {
    color: applicationColors.primary.shade900,
    marginTop: applicationDimensions.smallPadding,
    padding: applicationDimensions.smallPadding,
    textDecorationLine: null,
  },
});
