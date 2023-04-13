import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../../../../../../../../../style.css';

export default EStyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  stopName: {
    marginLeft: 5,
  },
  arriveTime: {
    marginLeft: 22,
    marginTop: 5,
    color: applicationColors.neutral.shade500,
  },
});
