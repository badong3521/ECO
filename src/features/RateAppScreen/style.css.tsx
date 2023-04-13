import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import { Dimensions, Platform } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../style.css';

export const IMAGE_HEIGHT = Dimensions.get('screen').height * 0.25;

export default EStyleSheet.create({
  root: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: applicationColors.neutral.shade900,
  },
  emoji: {
    aspectRatio: 180 / 231,
    height: IMAGE_HEIGHT,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    aspectRatio: 180 / 231,
    height: IMAGE_HEIGHT,
  },
  sliderTrack: {
    height: 8,
    borderRadius: 8,
  },
  sliderThumb: {
    ...applicationStyle.shadow,
    width: 8,
    height: 20,
  },
  slider: {
    width: '66%',
  },
  textInputContainer: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    width: '100%',
    justifyContent: 'space-between',
    flex: 1,
  },
  textInput: {
    borderRadius: applicationDimensions.roundBorderRadius,
    paddingHorizontal: applicationDimensions.defaultPadding,
    marginHorizontal: applicationDimensions.defaultPadding,
    paddingVertical:
      Platform.OS === 'ios' ? applicationDimensions.smallPadding : 0,
  },
  button: {
    minHeight: 40,
    width: 175,
    borderRadius: applicationDimensions.roundBorderRadius,
    backgroundColor: applicationColors.neutral.shade100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: Dimensions.get('screen').height - 40 - 30 - getStatusBarHeight(),
  },
  closeButton: {
    position: 'absolute',
    top: getStatusBarHeight() + applicationDimensions.defaultPadding,
    left: applicationDimensions.smallPadding,
    shadowOpacity: 0,
    elevation: 0,
  },
});
