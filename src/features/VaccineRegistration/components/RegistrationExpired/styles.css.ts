import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    paddingVertical: applicationDimensions.smallPadding,
    justifyContent: 'center',
  },
  image: {
    width: '30%',
    aspectRatio: 1,
    alignSelf: 'center',
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
  button: {
    borderRadius: applicationDimensions.roundBorderRadius,
  },
});
