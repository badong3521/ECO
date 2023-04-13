import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../../../style.css';

export const newsWidth = Dimensions.get('screen').width * 0.8;
export default EStyleSheet.create({
  box: {
    width: newsWidth,
    marginLeft: applicationDimensions.defaultPadding,
    marginRight: 5,
    borderRadius: applicationDimensions.roundBorderRadius,
    marginTop: applicationDimensions.smallPadding,
    ...applicationStyle.shadow,
    backgroundColor: applicationColors.primary.white,
    marginBottom: applicationDimensions.defaultPadding,
  },
  clear: {
    width:
      Dimensions.get('window').width - applicationDimensions.defaultPadding * 2,
    marginLeft: applicationDimensions.defaultPadding,
    marginRight: 5,
    borderRadius: applicationDimensions.roundBorderRadius,
    marginBottom: applicationDimensions.defaultPadding,
  },
  image_box: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: applicationDimensions.roundBorderRadius,
    borderTopRightRadius: applicationDimensions.roundBorderRadius,
  },
  image_clear: {
    width: '100%',
    aspectRatio: 1.79,
    borderRadius: applicationDimensions.roundBorderRadius,
  },
  infoContainer_clear: {
    paddingVertical: applicationDimensions.defaultPadding,
    paddingHorizontal: 5,
  },
  infoContainer_box: {
    padding: applicationDimensions.defaultPadding,
  },
  title: {
    marginTop: 12,
    flex: 1,
  },
  date: {
    color: applicationColors.neutral.shade500,
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  merchant: {
    flex: 1,
  },
});
