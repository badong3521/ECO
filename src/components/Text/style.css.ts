import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';
import {
  applicationColors,
  applicationFontFamily,
  applicationFontFamilyBold,
  applicationFontFamilySemiBold,
} from '../../../style.css';

export default EStyleSheet.create({
  text: {
    fontWeight: Platform.OS === 'ios' ? '300' : undefined,
    fontSize: '1rem',
    fontFamily: applicationFontFamily,
    color: applicationColors.neutral.shade900,
  },
  semiBold: {
    fontWeight: Platform.OS === 'ios' ? '500' : undefined,
    fontFamily: applicationFontFamilySemiBold,
    color: applicationColors.neutral.shade900,
  },
  bold: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : undefined,
    fontFamily: applicationFontFamilyBold,
    color: applicationColors.neutral.shade900,
  },
  italic: {
    fontStyle: 'italic',
    color: applicationColors.neutral.shade900,
  },
  tiny: {
    fontSize: '0.75rem',
  },
  small: {
    fontSize: '0.875rem',
  },
  large: {
    fontSize: '1.25rem',
  },
  white: {
    color: applicationColors.primary.white,
  },
  darkGrey: {
    color: applicationColors.neutral.shade900,
  },
  darkGreyV2: {
    color: '#606060',
  },
  grey: {
    color: applicationColors.neutral.shade500,
  },
  disabled: {
    color: applicationColors.disabled.text,
  },
});
