import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationDimensions,
  applicationStyle,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    padding: applicationDimensions.defaultPadding,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: -50,
    ...applicationStyle.shadow,
  },
});
