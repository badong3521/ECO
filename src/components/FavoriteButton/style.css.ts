import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors, applicationStyle } from '../../../style.css';

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8,
    marginRight: -7,
  },
  background: {
    borderRadius: 50,
    ...applicationStyle.iconShadow,
    backgroundColor: applicationColors.primary.white,
    width: 34.5,
    height: 34.5,
    position: 'absolute',
    alignSelf: 'center',
  },
  favoriteIcon: {
    height: 40,
    marginTop: -5,
    elevation: 6,
  },
});
