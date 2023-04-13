import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { applicationColors } from '../../../../../style.css';

const halfScreenWidth = Dimensions.get('screen').width / 2;
const halfScreenHeight = Dimensions.get('screen').height / 2;

export default EStyleSheet.create({
  pickLocationContainer: {
    backgroundColor: applicationColors.semantic.error.shade500,
    alignSelf: 'baseline',
    position: 'absolute',
    left: halfScreenWidth,
    right: halfScreenWidth,
    top: halfScreenHeight,
    bottom: halfScreenHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
