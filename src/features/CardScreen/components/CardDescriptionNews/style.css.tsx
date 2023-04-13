import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    padding: applicationDimensions.defaultPadding,
    marginTop: getStatusBarHeight(),
  },
  infoWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 5,
    flexDirection: 'row',
  },
  createdAt: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    textAlign: 'left',
    marginVertical: 10,
    lineHeight: 40,
  },
  body: {
    marginTop: 10,
  },
  userInformationContainer: {
    marginVertical: applicationDimensions.smallPadding,
  },
});
