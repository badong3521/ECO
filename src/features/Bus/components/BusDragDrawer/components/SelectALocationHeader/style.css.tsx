import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../style.css';

export default EStyleSheet.create({
  button: {
    marginLeft: applicationDimensions.defaultPadding,
    marginRight: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
    borderRadius: 8,
    marginTop: applicationDimensions.smallPadding,
  },
  appBarContainer: {
    height: 50,
    justifyContent: 'center',
  },
});
