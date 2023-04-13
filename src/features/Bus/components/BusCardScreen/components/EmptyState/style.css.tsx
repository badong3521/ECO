import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: applicationDimensions.defaultPadding,
    textAlign: 'center',
  },
  button: {
    minWidth: 150,
    marginHorizontal: applicationDimensions.defaultPadding,
    borderRadius: applicationDimensions.roundBorderRadius,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 30,
  },
});
