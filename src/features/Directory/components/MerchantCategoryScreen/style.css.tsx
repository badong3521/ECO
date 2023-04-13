import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    width: '25%',
  },
  floatingRightHeaderContainer: {
    flexDirection: 'row',
    marginRight: applicationDimensions.defaultPadding,
  },
  bookmarkButtonContainer: {
    marginLeft: -applicationDimensions.defaultPadding,
  },
});
