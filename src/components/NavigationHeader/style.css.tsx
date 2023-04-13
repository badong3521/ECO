import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: getStatusBarHeight(),
    paddingBottom: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.primary.white,
    paddingRight: applicationDimensions.smallPadding,
  },
  title: {
    justifyContent: 'center',
    marginLeft: applicationDimensions.smallPadding,
    flex: 1,
    marginRight: applicationDimensions.smallPadding,
  },
  backButton: {
    padding: applicationDimensions.smallPadding,
  },
});
