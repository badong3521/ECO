import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import { Dimensions } from 'react-native';
import { applicationColors, applicationDimensions } from '../../../style.css';

export const contentMarginTop = 220 + getStatusBarHeight();
export default EStyleSheet.create({
  root: {
    paddingTop: getStatusBarHeight(),
    flex: 1,
  },
  stickContainer: {
    marginTop: applicationDimensions.smallPadding,
  },
  background: {
    position: 'absolute',
    height: Dimensions.get('screen').width / 0.677,
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    backgroundColor: applicationColors.primary.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: 30,
    minHeight: Dimensions.get('screen').height * 0.8,
  },
  sectionContainer: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleSection: {
    flex: 1,
  },
  viewAll: {
    color: applicationColors.primary.shade900,
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: applicationDimensions.smallPadding,
  },
  newsContainer: {
    paddingRight: applicationDimensions.defaultPadding,
  },
  whiteBackground: {
    height: '50%',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: applicationColors.primary.white,
  },
  emptyBackground: {
    marginTop: 30,
    backgroundColor: applicationColors.primary.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: Dimensions.get('screen').height * 0.5,
    width: '100%',
  },
});
