import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors, applicationDimensions } from '../../../style.css';

export const badgeSize = 18;
export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: applicationDimensions.defaultPadding,
  },
  badgeContainer: {
    borderRadius: 23,
    position: 'absolute',
    top: 10,
    right: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: applicationColors.primary.white,
  },
  badge: {
    borderRadius: badgeSize,
    width: badgeSize,
    height: badgeSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    color: applicationColors.primary.white,
    textAlign: 'center',
    fontSize: 12,
  },
});
