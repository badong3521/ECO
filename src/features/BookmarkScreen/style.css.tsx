import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  noFavorite: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  list: {
    paddingTop: applicationDimensions.smallPadding,
  },
});
