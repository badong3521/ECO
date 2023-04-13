import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationStyle } from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    ...applicationStyle.iconShadow,
    position: 'absolute',
    top: -10,
    right: -10,
  },
});
