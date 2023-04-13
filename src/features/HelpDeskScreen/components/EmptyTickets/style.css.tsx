import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginHorizontal: applicationDimensions.defaultPadding,
    marginTop: 25,
    textAlign: 'center',
  },
  desc: {
    marginHorizontal: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.smallPadding,
    textAlign: 'center',
  },
  button: {
    borderRadius: applicationDimensions.roundBorderRadius,
    marginTop: 72,
    minWidth: 250,
    marginBottom: applicationDimensions.smallPadding,
    marginHorizontal: applicationDimensions.defaultPadding,
  },
  emptyImage: {
    width: '60%',
    aspectRatio: 1,
  },
});
