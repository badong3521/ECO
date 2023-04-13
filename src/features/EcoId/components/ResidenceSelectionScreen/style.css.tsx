import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    backgroundColor: applicationColors.secondary.background,
    flex: 1,
    padding: applicationDimensions.defaultPadding,
  },
  separator: {
    height: applicationDimensions.defaultPadding,
  },
});
