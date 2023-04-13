import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: applicationColors.secondary.background,
    padding: applicationDimensions.defaultPadding,
  },
  note: {
    color: applicationColors.neutral.shade900,
    paddingVertical: applicationDimensions.defaultPadding,
  },
});
