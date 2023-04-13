import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationDimensions,
  applicationColors,
  scaleFactor,
} from '../../../../../style.css';

export default EStyleSheet.create({
  formContainer: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.defaultPadding,
  },
  radioButton: {
    paddingLeft: 0,
  },
  itemRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageGroup: {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 48,
    width: (applicationDimensions.screenWidth - 48) / 2,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3FBFC',
    borderWidth: 1,
    borderColor: '#05A9C7',
  },
  buttonText: {
    color: '#05A9C7',
  },
  primaryButton: {
    backgroundColor: '#26A68C',
  },
  image: {
    minHeight: 92,
    width: (applicationDimensions.screenWidth - 80) / 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    backgroundColor: applicationColors.primary.white,
    paddingHorizontal: 16 * scaleFactor,
    paddingVertical: applicationDimensions.smallPadding * scaleFactor,
    color: applicationColors.neutral.shade900,
    fontSize: '1rem',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E5F0',
  },
  otherScanDesc: {
    marginVertical: 8,
  },
  imageError: {
    borderColor: applicationColors.semantic.error.shade500,
  },
});
