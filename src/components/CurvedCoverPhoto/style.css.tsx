import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default EStyleSheet.create({
  image: {
    flex: 1,
  },
  curve: {
    width: '100%',
    position: 'absolute',
    bottom: -20,
  },
  gradient: {
    width: Dimensions.get('screen').width,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});
