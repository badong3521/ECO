import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../../../style.css';

const imageWidth =
  Dimensions.get('screen').width - applicationDimensions.defaultPadding * 4;
export default EStyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: applicationColors.primary.white,
    marginHorizontal: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.smallPadding,
    ...applicationStyle.shadow,
    borderTopLeftRadius: applicationDimensions.roundBorderRadius,
    borderTopRightRadius: applicationDimensions.roundBorderRadius,
    padding: applicationDimensions.defaultPadding,
  },
  location: {
    color: applicationColors.neutral.shade900,
    textAlign: 'right',
    marginRight: applicationDimensions.smallPadding,
  },
  locationContainer: {
    flexDirection: 'row',
    marginLeft: applicationDimensions.defaultPadding,
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  },
  startTime: {
    lineHeight: 25,
  },
  contentContainer: {
    backgroundColor: applicationColors.primary.white,
    marginHorizontal: applicationDimensions.defaultPadding,
    ...applicationStyle.shadow,
    borderBottomLeftRadius: applicationDimensions.roundBorderRadius,
    borderBottomRightRadius: applicationDimensions.roundBorderRadius,
    padding: applicationDimensions.defaultPadding,
    marginTop: 5,
    marginBottom: applicationDimensions.defaultPadding,
  },
  title: {
    marginVertical: applicationDimensions.defaultPadding,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: applicationDimensions.defaultPadding,
  },
  leftConnect: {
    width: 4,
    height: 17,
    backgroundColor: '#FEA51A',
    borderRadius: 4,
    position: 'absolute',
    top: -11,
    left: 12,
  },
  rightConnect: {
    width: 4,
    height: 17,
    backgroundColor: '#FEA51A',
    borderRadius: 4,
    position: 'absolute',
    top: -11,
    right: 12,
  },
  image: {
    borderRadius: applicationDimensions.roundBorderRadius,
    width: imageWidth,
    aspectRatio: 2,
  },
  merchant: {
    flex: 1,
  },
});
