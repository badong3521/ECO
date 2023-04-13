import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  bigDivider: {
    height: 4,
    backgroundColor: applicationColors.neutral.shade200,
    marginBottom: applicationDimensions.smallPadding,
  },
  wrapper: {
    padding: applicationDimensions.defaultPadding,
    justifyContent: 'space-between',
  },
  top: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: '100%',
  },
  addressText: {
    maxWidth: '83%',
  },
  deleteAddress: {
    flex: 1,
  },
});
