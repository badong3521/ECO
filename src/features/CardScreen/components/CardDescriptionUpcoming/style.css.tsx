import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    padding: applicationDimensions.defaultPadding,
  },
  infoWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 5,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeContainer: {
    alignItems: 'flex-start',
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
    marginTop: 10,
  },
  createdAt: {
    flex: 1,
  },
});
