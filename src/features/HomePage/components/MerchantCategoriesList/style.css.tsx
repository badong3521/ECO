import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

const imageSize = Dimensions.get('screen').width * 0.1;

export default EStyleSheet.create({
  container: {
    paddingVertical: applicationDimensions.defaultPadding,
  },
  row: {
    flexDirection: 'row',
    borderRadius: applicationDimensions.roundBorderRadius,
  },
  viewAllContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAll: {
    width: imageSize,
    height: imageSize,
    backgroundColor: applicationColors.primary.shade300,
    borderRadius: imageSize,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    marginBottom: applicationDimensions.defaultPadding,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: applicationColors.secondary.shade500,
    borderRadius: 6,
    margin: 2,
  },
  bottom: {
    flexDirection: 'row',
    marginVertical: applicationDimensions.smallPadding,
  },
});
