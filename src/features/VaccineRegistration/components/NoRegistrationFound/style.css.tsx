import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    paddingVertical: applicationDimensions.smallPadding,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  details: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    paddingBottom: applicationDimensions.defaultPadding,
    textAlign: 'center',
  },
});
