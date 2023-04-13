import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';

export default EStyleSheet.create({
  containerIos: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  containerAndroid: {
    flex: 1,
  },
});
