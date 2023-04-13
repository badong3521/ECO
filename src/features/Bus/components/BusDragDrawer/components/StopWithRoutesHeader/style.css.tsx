import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    height: 'auto',
    marginTop: applicationDimensions.defaultPadding,
  },
  label: {
    paddingLeft: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.smallPadding,
  },
});
