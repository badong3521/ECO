import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  resendOtp: {
    color: applicationColors.primary.shade900,
    marginTop: 20,
    alignSelf: 'center',
    padding: applicationDimensions.smallPadding,
    textDecorationLine: null,
  },
  resendOtpDisable: {
    color: applicationColors.neutral.shade900,
    padding: applicationDimensions.smallPadding,
    marginTop: 20,
    alignSelf: 'center',
    textDecorationLine: null,
  },
});
