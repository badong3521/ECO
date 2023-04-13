import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  dash: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    position: 'absolute',
    borderColor: applicationColors.neutral.shade200,
    width: '100%',
    marginBottom: applicationDimensions.smallPadding,
  },
  hideAbove: {
    backgroundColor: applicationColors.primary.white,
    height: 1.5,
    marginBottom: 1,
  },
  hideBellow: {
    backgroundColor: applicationColors.primary.white,
    height: 1.5,
    marginTop: 1,
  },
});
