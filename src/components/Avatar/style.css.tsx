import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors, applicationStyle } from '../../../style.css';

export default EStyleSheet.create({
  avatar: {
    ...applicationStyle.shadow,
    shadowOpacity: 0.175,
    backgroundColor: applicationColors.primary.white,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: applicationColors.primary.white,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
