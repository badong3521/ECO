import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
  applicationFontFamily,
  scaleFactor,
} from '../../../../../style.css';

const errorColor = applicationColors.semantic.error.shade500;

const inputStyle = {
  width: '100%',
  backgroundColor: applicationColors.primary.white,
  paddingHorizontal: 16 * scaleFactor,
  paddingVertical: applicationDimensions.smallPadding * scaleFactor,
  borderRadius: applicationDimensions.squareBorderRadius,
  color: applicationColors.neutral.shade900,
  borderWidth: 1,
  borderColor: applicationColors.primary.white,
  fontSize: '1rem',
};

export default EStyleSheet.create({
  buttonIconColor: applicationColors.neutral.shade900,
  buttonIconDisabledColor: applicationColors.neutral.shade300,
  errorColor,
  fontStyle: {
    fontFamily: applicationFontFamily,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    marginTop: 2,
    marginLeft: 5,
    color: errorColor,
  },
  errorIconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorPadding: {
    height: applicationDimensions.defaultPadding,
  },
  outlinedInput: {
    width: '100%',
    backgroundColor: applicationColors.primary.white,
    borderRadius: applicationDimensions.squareBorderRadius,
    borderWidth: 1,
    borderColor: applicationColors.neutral.shade300,
  },
  input: inputStyle,
  inputError: {
    ...inputStyle,
    borderWidth: 1,
    borderColor: applicationColors.semantic.error.shade500,
    marginBottom: 16,
  },
  rightButtons: {
    position: 'absolute',
    right: -5,
    alignSelf: 'center',
  },
  trailingButtons: {
    position: 'absolute',
    flexDirection: 'row',
    right: 10,
    alignSelf: 'center',
  },
  disabled: {
    backgroundColor: applicationColors.neutral.shade200,
    borderColor: applicationColors.neutral.shade200,
  },
});
