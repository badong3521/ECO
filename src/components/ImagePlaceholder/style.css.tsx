import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../style.css';

export default EStyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: applicationColors.neutral.shade200,
  },
  lottie: {
    width: '50%',
  },
});
