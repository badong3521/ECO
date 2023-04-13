import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    paddingBottom: 50,
  },
  headers: {
    marginTop: -10,
    flexDirection: 'row',
  },
  closeButton: {
    marginRight: -15,
  },
  image: {
    width: '50%',
    aspectRatio: 121 / 139,
    alignSelf: 'center',
    marginVertical: applicationDimensions.defaultPadding * 1.5,
  },
  header: {
    padding: applicationDimensions.defaultPadding,
    paddingBottom: applicationDimensions.smallPadding,
    textAlign: 'center',
  },
  details: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    paddingBottom: applicationDimensions.defaultPadding,
    textAlign: 'center',
  },
});
