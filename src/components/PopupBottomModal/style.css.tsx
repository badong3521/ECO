import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WindowHeight = Dimensions.get('screen').height;

export default EStyleSheet.create({
  cover: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: WindowHeight,
    height: '100%',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  popup: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
});
