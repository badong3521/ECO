import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: applicationColors.secondary.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: applicationDimensions.defaultPadding,
  },
  label: {
    flex: 1,
  },
  signOutButton: {
    margin: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.semantic.error.shade200,
    borderRadius: 30,
    borderWidth: 1,
    minWidth: applicationDimensions.singleButtonWidth,
    alignSelf: 'center',
  },
  signOut: {
    color: applicationColors.semantic.error.shade500,
  },
});
