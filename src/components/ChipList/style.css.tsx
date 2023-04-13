import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  list: {
    paddingLeft: applicationDimensions.defaultPadding,
    paddingRight: applicationDimensions.defaultPadding,
  },
  wrapItem: {
    alignSelf: 'baseline',
  },
});
