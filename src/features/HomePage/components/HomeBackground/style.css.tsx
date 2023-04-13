import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default EStyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: Dimensions.get('screen').height,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  circle: {
    borderRadius: 256,
    width: 256,
    height: 256,
    position: 'absolute',
    right: -80,
    top: -60,
    opacity: 0.25,
  },
  circle2: {
    borderRadius: 184,
    width: 184,
    height: 184,
    position: 'absolute',
    left: -50,
    top: 176,
    opacity: 0.25,
  },
  blurCircle: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 116,
    left: '40%',
  },
});
