import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationDimensions,
  applicationFontFamily,
} from '../../../style.css';

export default EStyleSheet.create({
  inputContainer: {
    borderColor: '#979797',
    borderWidth: 0.5,
    borderRadius: 100,
    paddingLeft: 13,
    paddingRight: 13,
    flexDirection: 'row',
    alignItems: 'center',
    margin: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.smallPadding,
  },
  input: {
    fontFamily: applicationFontFamily,
    fontSize: 14,
    paddingVertical: 5,
    color: 'rgba(0, 0, 0, 0.38)',
    flex: 1,
    marginLeft: 5,
  },
});
