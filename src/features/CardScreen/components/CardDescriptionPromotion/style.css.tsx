import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    borderRadius: 5,
    marginBottom: 30,
    padding: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.defaultPadding + getStatusBarHeight(),
  },
  topContainer: {
    elevation: 5,
    marginTop: 30,
    backgroundColor: applicationColors.primary.white,
    borderTopRightRadius: applicationDimensions.roundBorderRadius,
    borderTopLeftRadius: applicationDimensions.roundBorderRadius,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: applicationDimensions.defaultPadding,
  },
  title: {
    marginBottom: applicationDimensions.smallPadding,
    marginTop: applicationDimensions.defaultPadding,
    textAlign: 'left',
  },
  description: {
    width: '100%',
    marginTop: 15,
    lineHeight: 17,
    color: applicationColors.primary.black,
  },
  topDash: {
    width: '100%',
    marginTop: applicationDimensions.defaultPadding,
  },
  dash: {
    width: '100%',
  },
  bottomContainer: {
    elevation: 5,
    alignItems: 'center',
    marginTop: -2,
    backgroundColor: applicationColors.primary.white,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: applicationDimensions.roundBorderRadius,
    borderBottomRightRadius: applicationDimensions.roundBorderRadius,
    paddingLeft: applicationDimensions.defaultPadding,
    paddingRight: applicationDimensions.defaultPadding,
    paddingBottom: applicationDimensions.defaultPadding,
  },
  bottomDescription: {
    textAlign: 'center',
    color: applicationColors.primary.shade900,
    padding: applicationDimensions.defaultPadding,
  },
  slideContainer: {
    width: '100%',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
  },
  innerShadow: {
    borderWidth: 0,
    borderRadius: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 5,
  },
  slideToRedeem: {
    color: applicationColors.primary.white,
    textAlign: 'center',
  },
  promotionButton: {
    position: 'absolute',
    left: 4,
    top: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promotionIndicator: {
    backgroundColor: applicationColors.primary.white,
    width: 45,
    height: 42,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.14,
    elevation: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redeemedAt: {
    color: applicationColors.primary.white,
    textAlign: 'center',
  },
  expiredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiredDate: {
    color: applicationColors.neutral.shade700,
  },
  favoriteCount: {
    alignSelf: 'flex-start',
    marginBottom: applicationDimensions.defaultPadding,
  },
  expire: {
    textAlign: 'right',
    flex: 1,
    color: applicationColors.neutral.shade500,
  },
  couponTag: {
    position: undefined,
    top: undefined,
    marginLeft: -20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
});
