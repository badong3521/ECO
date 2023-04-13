import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors, applicationDimensions } from '../../../style.css';

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
    marginTop: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.smallPadding,
    textAlign: 'center',
  },
  okButton: {
    borderRadius: 20,
    minWidth: applicationDimensions.singleButtonWidth,
    marginTop: applicationDimensions.defaultPadding,
  },
  errorMessage: {
    color: applicationColors.semantic.error.shade500,
    marginTop: applicationDimensions.smallPadding,
  },
});
