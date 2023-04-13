import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../style.css';

export default EStyleSheet.create({
  inactiveDot: {
    height: 7,
    width: 7,
    borderRadius: 5,
    backgroundColor: applicationColors.neutral.shade300,
    marginHorizontal: 3,
  },
  activeDot: {
    marginHorizontal: 3,
    height: 7,
    width: 20,
    borderRadius: 5,
    backgroundColor: applicationColors.primary.shade500,
  },
});
