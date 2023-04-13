import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 20,
    alignItems: 'center',
  },
  label: {
    color: applicationColors.primary.shade900,
    marginRight: 5,
    marginLeft: 10,
  },
});
