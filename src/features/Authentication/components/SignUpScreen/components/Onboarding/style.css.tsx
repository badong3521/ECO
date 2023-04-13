import EStyleSheet from 'react-native-extended-stylesheet';
import { scaleFactor } from '../../../../../../../style.css';

export default EStyleSheet.create({
  onboardingSection: {
    flex: 1,
  },
  pagination: {
    position: 'absolute',
    bottom: -45,
    alignSelf: 'center',
  },
  dotStyle: {
    width: 10 * scaleFactor,
    height: 5 * scaleFactor,
  },
  inactiveStyle: {
    width: 5 * scaleFactor,
    height: 5 * scaleFactor,
  },
});
