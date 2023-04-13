import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../style.css';

export default EStyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 10,
  },
  userName: {
    color: applicationColors.neutral.shade900,
    flex: 1,
  },
});
