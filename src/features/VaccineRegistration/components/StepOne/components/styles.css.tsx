import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../style.css';

export default EStyleSheet.create({
  content: {
    backgroundColor: '#F6F6F6',
    padding: 12,
    borderRadius: 12,
  },
  marginDefault: {
    marginBottom: applicationDimensions.defaultPadding,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E5F0',
  },
});
