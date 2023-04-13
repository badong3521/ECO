import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: applicationColors.secondary.background,
    flex: 1,
  },
  form: {
    padding: applicationDimensions.defaultPadding,
    width: '100%',
  },
  description: {
    color: applicationColors.neutral.shade900,
    marginLeft: 68,
    marginRight: 68,
    textAlign: 'center',
  },
  signUpButton: {
    borderRadius: 20,
    minWidth: applicationDimensions.singleButtonWidth,
    marginTop: applicationDimensions.defaultPadding,
  },
  checkbox: {
    width: applicationDimensions.iconSize,
    height: applicationDimensions.iconSize,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: applicationDimensions.defaultPadding,
  },
  errorMessage: {
    color: applicationColors.semantic.error.shade500,
    marginTop: applicationDimensions.smallPadding,
  },
});
