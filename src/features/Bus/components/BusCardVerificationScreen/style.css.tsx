import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
  scaleFactor,
} from '../../../../../style.css';

export default EStyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: applicationColors.secondary.background,
  },
  busCardActionContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardNumber: {
    marginBottom: applicationDimensions.defaultPadding,
  },
  input: {
    flex: 1,
  },
  inputLastName: {
    flex: 1,
    marginLeft: applicationDimensions.smallPadding * scaleFactor,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: applicationDimensions.iconSize,
    height: applicationDimensions.iconSize,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: applicationDimensions.smallPadding * scaleFactor,
    marginLeft: -5,
  },
  errorMessage: {
    color: applicationColors.semantic.error.shade500,
    marginTop: applicationDimensions.defaultPadding,
    alignSelf: 'center',
  },
  verifyButton: {
    borderRadius: 20,
    minWidth: applicationDimensions.singleButtonWidth,
    marginTop: applicationDimensions.defaultPadding,
    alignSelf: 'center',
  },
  square: {
    height: 13.5,
    width: 13.5,
    backgroundColor: applicationColors.neutral.shade300,
    borderRadius: 2,
    marginHorizontal: 5,
  },
});
