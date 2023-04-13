import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: applicationColors.primary.white,
  },
  loading: {
    flex: 1,
  },
});
