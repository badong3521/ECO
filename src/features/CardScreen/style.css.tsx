import { Dimensions, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import { applicationColors, applicationDimensions } from '../../../style.css';

export const ImageWidth = Dimensions.get('screen').width;

export default EStyleSheet.create({
  root: {
    flex: 1,
  },
  scrollView: {
    height: '100%',
    backgroundColor: applicationColors.secondary.background,
  },
  cardContainer: {
    padding: 10,
  },
  backgroundImage: {
    width: ImageWidth,
    marginTop: getStatusBarHeight(),
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation: 2,
    zIndex: 5,
    // So that the gradient is always there even if no content
    minHeight: getStatusBarHeight() * 2.5,
    marginTop: getStatusBarHeight(),
  },
  backContainer: {
    paddingTop: 30,
  },
  backNoCoverContainer: {
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: applicationColors.primary.white,
    textAlign: 'center',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
  },
  cardMerchantCoverPhoto: {
    aspectRatio: 1,
    height: 'auto',
  },
  bookmarkButton: {
    position: 'absolute',
    elevation: 4,
    right: 45.3,
    top: getStatusBarHeight() + 2,
  },
  loader: {
    backgroundColor: applicationColors.secondary.background,
    paddingVertical: applicationDimensions.defaultPadding,
  },
  topGradient: {
    height: 100 + getStatusBarHeight(),
    position: 'absolute',
    left: 0,
    right: 0,
  },
});
