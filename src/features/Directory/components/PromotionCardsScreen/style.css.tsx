import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: applicationColors.secondary.background,
  },
  featuredCards: {
    marginBottom: 0,
  },
  bookmarkButtonContainer: {
    marginRight: applicationDimensions.smallPadding,
  },
});
