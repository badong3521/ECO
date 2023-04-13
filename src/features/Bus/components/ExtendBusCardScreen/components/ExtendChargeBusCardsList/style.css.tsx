import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  fill: {
    flex: 1,
  },
  bottom: {
    backgroundColor: applicationColors.primary.white,
    padding: applicationDimensions.defaultPadding,
  },
  row: {
    flexDirection: 'row',
    marginTop: applicationDimensions.smallPadding,
  },
  price: {
    color: applicationColors.secondary.shade500,
  },
  button: {
    borderRadius: applicationDimensions.roundBorderRadius,
    marginTop: applicationDimensions.defaultPadding,
  },
  list: {
    margin: applicationDimensions.defaultPadding,
    paddingBottom: applicationDimensions.defaultPadding,
  },
});
