import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    backgroundColor: applicationColors.secondary.background,
    flex: 1,
  },
  description: {
    color: applicationColors.neutral.shade900,
    marginLeft: 68,
    marginRight: 68,
    textAlign: 'center',
    marginBottom: applicationDimensions.defaultPadding,
  },
  errorMessage: {
    color: applicationColors.semantic.error.shade500,
    marginTop: applicationDimensions.smallPadding,
    alignSelf: 'center',
  },
  verifyButton: {
    borderRadius: 20,
    minWidth: applicationDimensions.singleButtonWidth,
    marginTop: applicationDimensions.defaultPadding,
    alignSelf: 'center',
  },
});
