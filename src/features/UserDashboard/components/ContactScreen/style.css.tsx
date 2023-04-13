import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  loaderContainer: {
    marginTop: 20,
  },
  accordion: {
    paddingHorizontal: applicationDimensions.defaultPadding,
  },
  root: {
    backgroundColor: applicationColors.secondary.background,
    flex: 1,
  },
});
