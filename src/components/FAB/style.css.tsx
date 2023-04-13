import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../style.css';

export default EStyleSheet.create({
  floating: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: applicationColors.primary.shade900,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: applicationColors.primary.white,
    fontSize: 9,
    marginTop: 3,
  },
});
