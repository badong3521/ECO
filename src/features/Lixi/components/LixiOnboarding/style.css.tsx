import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  slogan: {
    height: '20%',
    aspectRatio: 198 / 163,
  },
  openGift: {
    width: '110%',
    aspectRatio: 451 / 545,
    marginTop: -50,
  },
  closeGift: {
    width: '80%',
    aspectRatio: 309 / 335,
    marginTop: '5%',
    maxHeight: '70%',
    alignSelf: 'center',
  },
  description: {
    color: applicationColors.semantic.warning.shade300,
    marginTop: 25,
    textAlign: 'center',
  },
  closed: {
    color: applicationColors.semantic.warning.shade300,
    alignSelf: 'center',
    position: 'absolute',
    bottom: Dimensions.get('screen').height * 0.025,
    padding: applicationDimensions.smallPadding,
  },
  closedText: {
    color: applicationColors.semantic.warning.shade300,
  },
});
