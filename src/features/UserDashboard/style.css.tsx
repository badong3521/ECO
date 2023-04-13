import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  actions: {
    marginLeft: 8,
    marginRight: 8,
    paddingBottom: 20,
  },
  scrollView: {
    height: '100%',
    backgroundColor: applicationColors.primary.white,
    paddingTop: applicationDimensions.defaultPadding,
  },
  notiListButton: {
    position: 'absolute',
    marginTop: getStatusBarHeight() - applicationDimensions.defaultPadding,
    padding: applicationDimensions.defaultPadding,
    right: 0,
  },
});
