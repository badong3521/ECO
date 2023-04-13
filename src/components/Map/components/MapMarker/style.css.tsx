import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  bubble: {
    width: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: applicationColors.neutral.shade900,
    paddingHorizontal: applicationDimensions.smallPadding,
    paddingVertical: applicationDimensions.smallPadding / 2,
    borderRadius: 6,
  },
  calloutText: {
    color: applicationColors.primary.white,
    textAlign: 'center',
  },
});
