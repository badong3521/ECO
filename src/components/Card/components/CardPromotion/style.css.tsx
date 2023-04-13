import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

const LOGO_SIZE = Dimensions.get('screen').width * 0.3;
export default EStyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: applicationColors.primary.white,
    flexDirection: 'row',
    marginHorizontal: applicationDimensions.defaultPadding,
    marginVertical: 6,
    padding: applicationDimensions.smallPadding,
  },
  logo: {
    height: LOGO_SIZE,
    width: LOGO_SIZE,
    borderRadius: 12,
  },
  promoBadge: {
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: 'orange',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  promoText: {
    color: applicationColors.primary.white,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: applicationDimensions.defaultPadding,
    justifyContent: 'space-between',
  },
  expired: {
    color: applicationColors.neutral.shade500,
  },
  expiredDate: {
    color: applicationColors.semantic.error.shade500,
  },
  title: {
    marginTop: applicationDimensions.smallPadding,
  },
  couponTag: {
    backgroundColor: applicationColors.semantic.error.shade500,
    paddingVertical: 5,
    paddingHorizontal: applicationDimensions.smallPadding,
    borderTopRightRadius: applicationDimensions.squareBorderRadius,
    borderBottomRightRadius: applicationDimensions.squareBorderRadius,
    position: 'absolute',
    top: 23,
    maxWidth: LOGO_SIZE,
  },
  couponText: {
    color: applicationColors.primary.white,
    fontSize: Platform.OS === 'android' ? '0.75rem' : undefined,
  },
});
