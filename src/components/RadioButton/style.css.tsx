import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  iOSRadioButton: {
    width: 32,
    height: 32,
    borderRadius: 32,
    borderWidth: 1,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    margin: applicationDimensions.smallPadding,
  },
});
