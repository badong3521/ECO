import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { applicationColors, applicationDimensions } from '../../../style.css';

export const imageSize = Dimensions.get('window').width * 0.25;
export default EStyleSheet.create({
  image: {
    marginRight: 5,
    marginBottom: 5,
    width: imageSize,
    height: imageSize,
    borderRadius: applicationDimensions.roundBorderRadius,
    borderColor: applicationColors.neutral.shade200,
    borderWidth: 0.5,
  },
  gallery: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    minWidth: '100%',
    marginLeft: applicationDimensions.defaultPadding,
  },
});
