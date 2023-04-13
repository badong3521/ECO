import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    paddingBottom: applicationDimensions.defaultPadding,
  },
  image: {
    width: '100%',
    aspectRatio: 871 / 437,
  },
});
