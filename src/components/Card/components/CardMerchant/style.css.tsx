import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

const LOGO_SIZE = Dimensions.get('screen').width * 0.3;
export default EStyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: applicationColors.primary.white,
    flexDirection: 'row',
  },
  logoContainer: {
    height: LOGO_SIZE,
    width: LOGO_SIZE,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  logo: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    height: LOGO_SIZE,
    width: LOGO_SIZE,
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
    paddingHorizontal: applicationDimensions.defaultPadding,
    paddingVertical: applicationDimensions.smallPadding,
    justifyContent: 'space-between',
    flex: 1,
  },
  categoryBadgeContainer: {
    marginTop: applicationDimensions.smallPadding,
    flexDirection: 'row',
  },
  categoryBadge: {
    paddingHorizontal: applicationDimensions.smallPadding,
    paddingVertical: 2,
  },
  merchantName: {
    color: applicationColors.neutral.shade900,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: applicationDimensions.defaultPadding,
  },
  address: {
    marginLeft: applicationDimensions.smallPadding,
    color: applicationColors.neutral.shade500,
  },
});
