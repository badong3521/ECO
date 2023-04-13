import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { applicationDimensions } from '../../../../../style.css';

export const containerSize = Dimensions.get('screen').width / 4;

export const iconContainerSize = containerSize - 30;

export const imageSize = containerSize * 0.65;
export const shadowWidth = imageSize * 0.8;
export const shadowHeight = shadowWidth * 0.1;
export default EStyleSheet.create({
  container: {
    width: containerSize,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  text: {
    textAlign: 'center',
    flex: 1,
    marginTop: applicationDimensions.smallPadding,
    marginHorizontal: 5,
  },
  image: {
    height: imageSize,
  },
  icon: {
    height: imageSize,
    position: 'absolute',
    shadowOpacity: 0,
    zIndex: 2,
    elevation: 2,
  },
});
