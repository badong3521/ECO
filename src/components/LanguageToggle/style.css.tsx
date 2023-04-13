import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors, applicationStyle } from '../../../style.css';

export const languageButtonSize = 30;
export default EStyleSheet.create({
  root: {
    borderRadius: 20,
    padding: 2,
    borderColor: applicationColors.neutral.shade300,
    borderWidth: 1,
  },
  language: {
    flex: 1,
    textAlign: 'center',
    color: applicationColors.neutral.shade900,
    paddingVertical: 4,
  },
  floatingContainer: {
    position: 'absolute',
    top: 2,
    left: 2,
  },
  floating: {
    width: languageButtonSize,
    borderRadius: 20,
    backgroundColor: applicationColors.primary.shade900,
    ...applicationStyle.shadow,
  },
  floatingText: {
    flex: 1,
    textAlign: 'center',
    color: applicationColors.primary.white,
    paddingVertical: 4,
  },
  bgLanguage: { width: languageButtonSize * 2, flexDirection: 'row' },
});
