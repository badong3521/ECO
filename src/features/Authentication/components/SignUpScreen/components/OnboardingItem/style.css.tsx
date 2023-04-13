import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import {
  applicationDimensions,
  scaleFactor,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { textAlign: 'center' },
  textContainer: {
    marginLeft: applicationDimensions.smallPadding,
    marginRight: applicationDimensions.smallPadding,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: getStatusBarHeight(),
    minHeight: 40 * scaleFactor,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: applicationDimensions.smallPadding,
    marginLeft: applicationDimensions.defaultPadding,
    maxWidth: '80%',
    marginRight: applicationDimensions.defaultPadding,
  },
});
