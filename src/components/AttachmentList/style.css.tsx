import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  content: {
    alignItems: 'center',
  },
  addPhotoContainer: {
    width: 76,
    height: 76,
    justifyContent: 'center',
  },
  addPhotoButton: {
    backgroundColor: applicationColors.neutral.shade200,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: applicationDimensions.squareBorderRadius,
  },
});
