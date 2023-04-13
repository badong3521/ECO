import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',

    borderRadius: 100,
    padding: applicationDimensions.smallPadding,
  },
});
