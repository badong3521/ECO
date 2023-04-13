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
    aspectRatio: 1 / 1,
    marginBottom: 20,
  },
  message: {
    marginTop: 20,
    margin: 30,
    textAlign: 'center',
  },
  button: {
    borderRadius: applicationDimensions.roundBorderRadius,
    minWidth: applicationDimensions.singleButtonWidth,
    marginBottom: applicationDimensions.defaultPadding,
  },
});
