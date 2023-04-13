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
    backgroundColor: applicationColors.primary.white,
    padding: applicationDimensions.defaultPadding,
  },
  itemRadioContainer: {
    width: applicationDimensions.screenWidth - 70,
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
  buttonPopup: {
    marginHorizontal: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
  },
  textPopup: {
    marginBottom: applicationDimensions.defaultPadding,
    marginHorizontal: applicationDimensions.defaultPadding,
    textAlign: 'center',
  },
  loader: {
    paddingTop: applicationDimensions.defaultPadding,
  },
});
