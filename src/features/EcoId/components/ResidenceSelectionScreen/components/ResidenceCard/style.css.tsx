import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  card: {
    ...applicationStyle.shadow,
    borderRadius: applicationDimensions.squareBorderRadius,
    overflow: 'hidden',
    backgroundColor: applicationColors.semantic.info.shade500,
    minHeight: 100,
    justifyContent: 'center',
  },
  contentContainer: {
    padding: applicationDimensions.defaultPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: applicationColors.primary.white,
    fontSize: 30 / Dimensions.get('screen').fontScale,
  },
  locationCode: {
    fontSize: 30 / Dimensions.get('screen').fontScale,
    color: applicationColors.primary.white,
    alignSelf: 'flex-end',
  },
  infoContainer: {
    flexGrow: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    bottom: -25,
  },
  actionIcon: {
    marginLeft: applicationDimensions.smallPadding,
  },
  row: {
    flexDirection: 'row',
  },
  rowItem: {
    flex: 1,
    justifyContent: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    marginBottom: applicationDimensions.smallPadding,
  },
});
