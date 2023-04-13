import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'utils/statusBar';
import {
  applicationColors,
  applicationDimensions,
  applicationLoraFontFamily,
  applicationLoraFontFamilyBold,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: getStatusBarHeight(),
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  pattern: {
    position: 'absolute',
    right: '-60%',
    bottom: 0,
    width: '130%',
    aspectRatio: 1,
  },
  congratulationContainer: {
    right: 100,
    left: 32,
    top: Dimensions.get('screen').height * 0.04 + getStatusBarHeight(),
    position: 'absolute',
    zIndex: 10,
    elevation: 10,
  },
  congratulation: {
    color: applicationColors.semantic.warning.shade100,
    fontFamily: applicationLoraFontFamilyBold,
  },
  content: {
    alignSelf: 'center',
  },
  lixiBackground: {
    width: '100%',
    aspectRatio: 332 / 482,
    maxHeight: Dimensions.get('screen').height * 0.67,
    marginTop: getStatusBarHeight(),
    alignSelf: 'center',
  },
  openGift: {
    height: '37%',
    aspectRatio: 220 / 224,
    right: 0,
    top: '-10%',
    position: 'absolute',
  },
  scrollView: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.23,
    alignSelf: 'center',
    height: Dimensions.get('screen').height * 0.35,
    paddingRight: 5,
    aspectRatio: 224 / 265,
  },
  title: {
    color: applicationColors.secondary.shade900,
    fontFamily: applicationLoraFontFamilyBold,
  },
  description: {
    marginTop: applicationDimensions.defaultPadding,
  },
  descriptionFont: {
    color: applicationColors.secondary.shade900,
    fontFamily: applicationLoraFontFamily,
    lineHeight: 25,
    fontSize: '1rem',
  },
  buttonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 8,
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  share: {
    color: applicationColors.semantic.warning.shade300,
    position: 'absolute',
  },
  closed: {
    color: applicationColors.semantic.warning.shade300,
    alignSelf: 'center',
    position: 'absolute',
    bottom: -70,
    padding: applicationDimensions.smallPadding,
  },
  closedText: {
    color: applicationColors.semantic.warning.shade300,
  },
  avatarContainer: {
    marginBottom: applicationDimensions.defaultPadding,
  },
  expireContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  expiredDate: {
    color: applicationColors.secondary.shade900,
  },
  expire: {
    color: applicationColors.secondary.shade700,
  },
  bounceView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
