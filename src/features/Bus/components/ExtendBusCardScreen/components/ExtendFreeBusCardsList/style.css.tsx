import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  fill: {
    flex: 1,
  },
  list: {
    margin: applicationDimensions.defaultPadding,
    paddingBottom: applicationDimensions.defaultPadding,
  },
  bottom: {
    padding: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.primary.white,
  },
  button: {
    borderRadius: applicationDimensions.roundBorderRadius,
    marginBottom: applicationDimensions.defaultPadding,
  },
});
