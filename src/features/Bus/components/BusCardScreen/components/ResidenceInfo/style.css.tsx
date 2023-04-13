import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: applicationDimensions.defaultPadding,
    marginTop: 5,
  },
  locationCode: {
    marginLeft: applicationDimensions.smallPadding,
  },
});
