import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../style.css';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: applicationColors.primary.white,
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: applicationColors.primary.white,
    borderRadius: 8,
    borderColor: applicationColors.semantic.error.shade500,
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'center',
    fontSize: 30,
  },
  hiddenInput: {
    flex: 1,
    width: 0,
    height: 0,
    opacity: 0,
  },
});
