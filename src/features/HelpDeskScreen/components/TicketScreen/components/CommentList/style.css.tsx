import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../style.css';

export default EStyleSheet.create({
  commentContainer: {
    marginBottom: applicationDimensions.defaultPadding,
  },
  containerUser: {
    marginLeft: applicationDimensions.defaultPadding,
  },
  containerSupport: {
    marginRight: applicationDimensions.defaultPadding,
  },
});
