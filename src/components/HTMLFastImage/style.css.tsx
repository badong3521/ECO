import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { applicationDimensions } from '../../../style.css';

const PLACEHOLDER_IMAGE_ASPECT_RATIO = 1200 / 500;
const PLACEHOLDER_IMAGE_MAX_WIDTH =
  Dimensions.get('screen').width - applicationDimensions.defaultPadding * 2;

export default EStyleSheet.create({
  container: {
    marginVertical: applicationDimensions.smallPadding,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  placeholder: {
    position: 'absolute',
    marginVertical: applicationDimensions.smallPadding,
    width: PLACEHOLDER_IMAGE_MAX_WIDTH,
    height: PLACEHOLDER_IMAGE_MAX_WIDTH / PLACEHOLDER_IMAGE_ASPECT_RATIO,
  },
});
