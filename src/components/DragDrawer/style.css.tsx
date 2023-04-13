import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import { applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  panelContainer: {
    width: '100%',
    height: '100%',
    paddingTop: getStatusBarHeight(),
  },
  bottomSheet: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.14,
    elevation: 20,
    paddingBottom: applicationDimensions.smallPadding,
  },
});
