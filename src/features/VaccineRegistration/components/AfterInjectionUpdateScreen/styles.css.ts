import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: applicationColors.neutral.shade200,
  },
  content: {
    flex: 1,
    marginTop: applicationDimensions.defaultPadding,
    // marginBottom: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.primary.white,
    padding: applicationDimensions.defaultPadding,
  },
  itemRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    paddingLeft: 0,
  },
  footer: {
    justifyContent: 'flex-end',
    padding: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.primary.white,
    marginTop: applicationDimensions.defaultPadding,
  },
  rightHeader: {
    width: 56,
    height: 40,
  },
  button: {
    borderRadius: 20,
  },
});
