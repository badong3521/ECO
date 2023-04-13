import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    borderRadius: 12,
    borderColor: applicationColors.semantic.error.shade500,
    borderWidth: 1,
    padding: 16,
    marginTop: applicationDimensions.smallPadding,
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    color: applicationColors.semantic.error.shade500,
  },
  notice: {
    color: applicationColors.semantic.error.shade500,
    marginTop: applicationDimensions.smallPadding,
  },
});
