import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  heading: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    paddingVertical: 5,
  },
  title: {
    marginTop: 5,
  },
  logo: {
    position: 'absolute',
    right: applicationDimensions.defaultPadding,
    top: -13,
    width: 100,
    color: applicationColors.primary.white,
  },
  headerContainer: {
    marginTop: getStatusBarHeight(),
    backgroundColor: 'red',
    paddingVertical: applicationDimensions.smallPadding,
  },
});
