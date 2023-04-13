import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: applicationDimensions.defaultPadding,
    paddingTop: getStatusBarHeight(),
    ...applicationStyle.iconShadow,
  },
  title: {
    color: applicationColors.primary.black,
    fontWeight: '500',
    flexGrow: 1,
    textAlign: 'center',
    marginTop: 5,
  },
  backButton: {
    flexDirection: 'row',
    position: 'absolute',
    left: applicationDimensions.defaultPadding,
    top: 5,
    elevation: 4,
  },
  trailingButton: {
    flexDirection: 'row',
    position: 'absolute',
    right: applicationDimensions.defaultPadding,
    top: 5,
    elevation: 4,
  },
  shareIcon: {
    marginLeft: -3,
    marginTop: -1,
  },
});
