import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../style.css';

export default EStyleSheet.create({
  container: {
    backgroundColor: applicationColors.secondary.background,
    flex: 1,
  },
  scrollView: {
    paddingLeft: applicationDimensions.defaultPadding,
    paddingRight: applicationDimensions.defaultPadding,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: applicationDimensions.defaultPadding,
    ...applicationStyle.shadow,
    backgroundColor: applicationColors.primary.white,
    borderRadius: 100,
    padding: 6,
  },
  avatar: {
    elevation: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  padding: {
    flex: 1,
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 17,
  },
  input: {
    borderRadius: 3,
    borderColor: applicationColors.neutral.shade700,
    borderWidth: 1,
  },
  changePasswordButton: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginBottom: applicationDimensions.defaultPadding,
  },
  doneButton: {
    borderRadius: 20,
    minWidth: applicationDimensions.singleButtonWidth,
    marginTop: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
    alignSelf: 'center',
  },
  changePassword: {
    borderRadius: 20,
    minWidth: applicationDimensions.singleButtonWidth,
  },
  cameraIcon: {
    backgroundColor: applicationColors.primary.white,
    borderRadius: 20,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 10,
    ...applicationStyle.shadow,
  },
  errorMessage: {
    color: applicationColors.semantic.error.shade500,
    marginTop: applicationDimensions.defaultPadding,
    alignSelf: 'center',
  },
  description: {
    alignSelf: 'center',
    marginBottom: applicationDimensions.defaultPadding,
    color: applicationColors.neutral.shade900,
  },
  rightColumn: {
    flex: 1,
    marginLeft: applicationDimensions.smallPadding,
  },
  leftColumn: {
    flex: 1,
  },
});
