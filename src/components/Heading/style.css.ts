import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';
import {
  applicationFontFamily,
  applicationFontFamilyBold,
  applicationFontFamilySemiBold,
} from '../../../style.css';

export default EStyleSheet.create({
  heading: {
    fontWeight: Platform.OS === 'ios' ? '100' : undefined,
    fontSize: '1rem',
    fontFamily: applicationFontFamily,
  },
  semiBold: {
    fontWeight: Platform.OS === 'ios' ? '600' : undefined,
    fontFamily: applicationFontFamilySemiBold,
  },
  bold: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : undefined,
    fontFamily: applicationFontFamilyBold,
  },
  h1: {
    fontSize: '1.85rem',
    lineHeight: 50,
  },
  h2: {
    fontSize: '1.75rem',
    lineHeight: 40,
  },
  h3: {
    fontSize: '1.5rem',
    lineHeight: 35,
  },
  h4: {
    fontSize: '1.25rem',
    lineHeight: 30,
  },
  h5: {
    fontSize: '1rem',
    lineHeight: 25,
  },
});
