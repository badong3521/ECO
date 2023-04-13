import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'utils/statusBar';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: applicationColors.primary.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('screen').height * 0.28,
    aspectRatio: 232 / 277,
  },
  title: {
    textAlign: 'center',
    marginHorizontal: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.defaultPadding,
    lineHeight: 24,
  },
  desc: {
    textAlign: 'center',
    marginHorizontal: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.defaultPadding,
    marginBottom: 50,
    lineHeight: 24,
  },
  button: {
    borderRadius: applicationDimensions.roundBorderRadius,
    backgroundColor: applicationColors.primary.shade900,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 36,
    bottom: 5 + getStatusBarHeight(),
  },
});
