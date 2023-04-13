import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '70%',
    aspectRatio: 232 / 277,
  },
  message: {
    marginTop: 20,
    margin: 30,
  },
  button: {
    borderRadius: applicationDimensions.roundBorderRadius,
    minWidth: applicationDimensions.singleButtonWidth,
  },
});
