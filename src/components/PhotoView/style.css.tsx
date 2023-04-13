import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  animated: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  image: {
    flex: 1,
  },
  backButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: getStatusBarHeight(),
    position: 'absolute',
    zIndex: 10,
    paddingLeft: applicationDimensions.smallPadding,
    backgroundColor: applicationColors.secondary.softBlack,
  },
  index: {
    color: applicationColors.primary.white,
    textAlign: 'center',
    position: 'absolute',
    top: 15 + getStatusBarHeight(),
    left: 100,
    right: 100,
  },
});
