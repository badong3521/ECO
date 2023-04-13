import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 20,
  },
});

export const stopName = EStyleSheet.create({
  flex: 1,
  marginLeft: 10,
  marginRight: 10,
  color: applicationColors.neutral.shade900,
});
