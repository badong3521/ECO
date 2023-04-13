import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationDimensions,
  applicationColors,
  scaleFactor,
} from '../../../../style.css';

export const PLACEHOLDER_TEXT_COLOR = '#A7ABC3';

export default EStyleSheet.create({
  content: {
    backgroundColor: '#F6F6F6',
    padding: 12,
    borderRadius: 12,
  },
  marginDefault: {
    marginBottom: applicationDimensions.defaultPadding,
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
  containerDropdown: {
    borderWidth: 1,
    borderColor: applicationColors.neutral.shade300,
  },
  imageGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageContainer: {
    minHeight: 92,
    width: (applicationDimensions.screenWidth - 80) / 2,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FBFBFB',
    flexDirection: 'row',
  },
  imageText: {
    marginLeft: 8,
  },
  separateBar: {
    height: applicationDimensions.defaultPadding,
    width: '100%',
    backgroundColor: applicationColors.neutral.shade150,
  },
  defaultPaddingHorizontal: {
    paddingHorizontal: applicationDimensions.defaultPadding,
  },
  defaultPaddingTop: {
    paddingTop: applicationDimensions.defaultPadding,
  },
  nextButtonDisable: {
    backgroundColor: '#D8D8D8',
    borderWidth: 0,
  },
  nextButtonDisableText: {
    color: '#8B8B8B',
  },
  signRequired: {
    color: applicationColors.semantic.error.shade500,
  },
});
