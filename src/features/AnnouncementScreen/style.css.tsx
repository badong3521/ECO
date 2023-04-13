import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  root: {
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: applicationColors.secondary.background,
    height: Dimensions.get('screen').height / 2,
  },
  androidBackdropTopCorner: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: applicationColors.secondary.background,
    borderTopRightRadius: applicationDimensions.roundBorderRadius,
    borderTopLeftRadius: applicationDimensions.roundBorderRadius,
  },
  androidBackdropBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    backgroundColor: applicationColors.secondary.background,
  },
  contentContainer: {
    flex: 1,
    minHeight: Dimensions.get('screen').height / 2,
    marginTop: 30,
    paddingTop: 50,
    paddingHorizontal: applicationDimensions.defaultPadding,
  },
  avatar: {
    position: 'absolute',
    top: -75 / 2,
    left: 25,
    borderWidth: 75 / 2 + 1,
    borderColor: applicationColors.primary.white,
    elevation: 0,
    borderRadius: 100,
    backgroundColor: applicationColors.primary.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorContainer: {
    position: 'absolute',
    top: -75 / 2,
    right: 25,
  },
  author: {
    color: applicationColors.primary.white,
    textTransform: 'uppercase',
  },
  badgeContainer: {
    flexDirection: 'row',
    marginBottom: applicationDimensions.smallPadding,
  },
  title: {
    marginBottom: applicationDimensions.defaultPadding,
  },
  backButtonContainer: {
    paddingTop: getStatusBarHeight(),
  },
  textContainer: {
    paddingBottom: applicationDimensions.defaultPadding,
  },
  date: {
    marginBottom: applicationDimensions.defaultPadding,
    color: applicationColors.neutral.shade900,
  },
  webview: {
    width:
      Dimensions.get('screen').width - applicationDimensions.defaultPadding * 2,
  },
});
