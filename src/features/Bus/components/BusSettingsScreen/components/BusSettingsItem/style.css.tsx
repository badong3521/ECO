import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../../../../../style.css';

export default EStyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: applicationColors.neutral.shade200,
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
});
