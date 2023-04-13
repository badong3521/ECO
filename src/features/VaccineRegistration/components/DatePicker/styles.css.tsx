import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../../../style.css';

export default EStyleSheet.create({
  iconDatePicker: {
    position: 'absolute',
    right: 8,
    bottom: 13,
  },
  marginNone: {
    marginTop: 0,
  },
  inputDataPicker: {
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E5F0',
    paddingTop: 0,
  },
  inputDataPickerError: {
    borderColor: applicationColors.semantic.error.shade500,
  },
});
