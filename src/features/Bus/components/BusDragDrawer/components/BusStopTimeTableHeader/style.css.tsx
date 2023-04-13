import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    width: '100%',
    marginBottom: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.defaultPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
