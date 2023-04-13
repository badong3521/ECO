import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    marginTop: applicationDimensions.defaultPadding,
  },
  resolve: {
    backgroundColor: applicationColors.semantic.error.shade500,
    borderRadius: 50,
    minWidth: applicationDimensions.singleButtonWidth,
    marginBottom: applicationDimensions.defaultPadding,
    marginTop: 30,
  },
  message: {
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: applicationColors.semantic.error.shade100,
    marginHorizontal: applicationDimensions.defaultPadding,
    marginVertical: applicationDimensions.smallPadding,
    borderRadius: applicationDimensions.roundBorderRadius,
  },
  closeLabel: {
    color: applicationColors.semantic.error.shade500,
  },
  continue: {
    color: applicationColors.primary.shade900,
  },
});
