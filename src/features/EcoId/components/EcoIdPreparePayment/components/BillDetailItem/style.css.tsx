import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../style.css';

export default EStyleSheet.create({
  row: {
    marginLeft: -23,
    flexDirection: 'row',
    paddingVertical: applicationDimensions.smallPadding,
    paddingRight: 48,
  },
  detailTitle: {
    flex: 1,
    marginRight: 5,
  },
});
