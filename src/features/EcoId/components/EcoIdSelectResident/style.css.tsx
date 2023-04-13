import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: applicationColors.secondary.background,
  },
  scrollView: {
    flex: 1,
  },
  description: {
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.smallPadding,
    color: applicationColors.neutral.shade900,
  },
  row: {
    ...applicationStyle.shadow,
    padding: applicationDimensions.defaultPadding,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: applicationColors.primary.white,
    marginBottom: applicationDimensions.defaultPadding,
    borderRadius: 12,
    marginHorizontal: applicationDimensions.defaultPadding,
  },
  title: {
    color: applicationColors.neutral.shade900,
  },
  subTitle: {
    marginTop: 5,
    color: applicationColors.neutral.shade900,
  },
  buttons: {
    flexDirection: 'row',
    paddingHorizontal: applicationDimensions.smallPadding,
    width: '100%',
    marginVertical: applicationDimensions.defaultPadding,
  },
  buttonContainer: {
    flex: 1,
    marginRight: applicationDimensions.smallPadding,
    marginLeft: applicationDimensions.smallPadding,
  },
  buttonHelpDesk: {
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: applicationColors.semantic.info.shade100,
  },
  buttonContinue: {
    borderRadius: 30,
  },
  buttonLabel: {
    color: applicationColors.semantic.info.shade500,
  },
  checkbox: {
    borderRadius: 4,
    width: 16,
    height: 16,
    borderWidth: 1,
    marginRight: applicationDimensions.defaultPadding,
    borderColor: applicationColors.neutral.shade300,
  },
  checked: {
    position: 'absolute',
    top: -6,
  },
});
