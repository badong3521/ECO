import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationDimensions,
  applicationColors,
} from '../../../../../style.css';

export default EStyleSheet.create({
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
  image: {
    minHeight: 92,
    width: (applicationDimensions.screenWidth - 80) / 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageError: {
    borderColor: applicationColors.semantic.error.shade500,
  },
});
