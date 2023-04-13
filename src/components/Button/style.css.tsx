import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationFontFamily,
  applicationFontWeight,
} from '../../../style.css';

export const loadingColors = {
  primary: applicationColors.primary.white,
  secondary: applicationColors.primary.shade900,
  text: applicationColors.primary.shade900,
  clear: applicationColors.primary.shade900,
  secondary2: applicationColors.secondary2.shade900,
};

export default EStyleSheet.create({
  button: {
    padding: 2,
    borderRadius: 8,
    fontFamily: applicationFontFamily,
    elevation: 0,
    shadowOpacity: 0,
  },
  labelStyle: {
    fontFamily: applicationFontFamily,
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  primaryDisabled: {
    backgroundColor: '#d3d3d3',
  },
  primary: {
    backgroundColor: applicationColors.primary.shade900,
  },
  secondary: {
    backgroundColor: applicationColors.primary.shade300,
    elevation: 0,
  },
  secondary2: {
    backgroundColor: applicationColors.secondary2.shade100,
    elevation: 0,
    borderWidth: 1,
    borderColor: applicationColors.secondary2.shade900,
  },
  darkTitle: {
    color: applicationColors.primary.shade900,
  },
  lightTitle: {
    color: applicationColors.primary.white,
  },
  softLightTitle: {
    color: applicationColors.neutral.shade300,
  },
  softDarkTitle: {
    color: applicationColors.neutral.shade900,
  },
  clearLabel: {
    letterSpacing: 1.5,
    fontSize: '0.7rem',
  },
  lottie: {
    height: 60,
    elevation: 10,
    zIndex: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryLabel: {
    ...applicationFontWeight.bold,
  },
  secondary2Label: {
    color: applicationColors.secondary2.shade900,
  },
});
