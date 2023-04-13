import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: applicationDimensions.defaultPadding,
  },
  badge: {
    paddingHorizontal: 5,
    borderRadius: 1000,
    position: 'absolute',
    top: 10,
    right: 0,
    backgroundColor: applicationColors.secondary.shade500,
    borderColor: applicationColors.secondary.background,
    borderWidth: 1,
  },
  count: {
    color: applicationColors.primary.white,
    textAlign: 'center',
  },
});
