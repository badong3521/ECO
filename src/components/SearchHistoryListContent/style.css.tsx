import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  label: {
    paddingLeft: applicationDimensions.defaultPadding,
    paddingRight: applicationDimensions.defaultPadding,
    paddingBottom: applicationDimensions.smallPadding,
    color: applicationColors.neutral.shade500,
  },
  list: {
    height: 'auto',
  },
  noHistory: {
    textAlign: 'center',
    margin: applicationDimensions.defaultPadding,
  },
});
