import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../style.css';

export default EStyleSheet.create({
  root: {
    backgroundColor: applicationColors.secondary.background,
    width: '100%',
    height: '100%',
  },
  container: {
    paddingLeft: 16,
  },
  label: {
    marginTop: 16,
    flex: 1,
  },
  loading: {
    margin: 30,
  },
  dropdown: {
    marginRight: 16,
  },
});
