import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  stopTypes: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
    paddingLeft: applicationDimensions.smallPadding,
    paddingRight: applicationDimensions.smallPadding,
  },
  stopType: {
    flexDirection: 'row',
    marginRight: 18,
    alignItems: 'center',
  },
  stopTypeIcon: {
    marginRight: 5,
  },
});
