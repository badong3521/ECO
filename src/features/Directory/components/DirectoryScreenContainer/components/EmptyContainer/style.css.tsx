import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../style.css';

export default EStyleSheet.create({
  listEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
  },
  listEmptyImage: {
    height: 192,
    width: 198,
    marginBottom: applicationDimensions.defaultPadding,
  },
  message: {
    textAlign: 'center',
    marginTop: applicationDimensions.defaultPadding,
  },
});
