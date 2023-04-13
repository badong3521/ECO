import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export const photoSize =
  Dimensions.get('screen').width - applicationDimensions.defaultPadding * 2;
export default EStyleSheet.create({
  container: {
    marginTop: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
    alignItems: 'center',
    marginHorizontal:
      Platform.OS === 'android' ? 0 : applicationDimensions.defaultPadding,
  },
  carousel: {
    borderRadius: applicationDimensions.roundBorderRadius,
  },
  photo: {
    width: photoSize,
    height: photoSize / 2,
    zIndex: -1,
    borderRadius:
      Platform.OS === 'android' ? applicationDimensions.roundBorderRadius : 0,
  },
  photoContainer: {
    flex: 1,
    zIndex: -1,
    paddingHorizontal:
      Platform.OS === 'android'
        ? applicationDimensions.defaultPadding
        : undefined,
  },
  dot: {
    width: 28,
    height: 10,
    borderRadius: 10,
    backgroundColor: applicationColors.primary.shade500,
  },
  inactiveDot: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: applicationColors.primary.shade100,
    padding: 0,
  },
  dotContainer: {
    marginHorizontal: 0,
  },
  pagination: {
    position: 'absolute',
    bottom: applicationDimensions.smallPadding,
    left: applicationDimensions.smallPadding,
    paddingVertical: 0,
  },
});
