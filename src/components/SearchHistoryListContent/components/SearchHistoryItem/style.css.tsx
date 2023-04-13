import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: applicationDimensions.defaultPadding,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: applicationColors.neutral.shade200,
    borderTopWidth: 0.5,
    borderTopColor: applicationColors.neutral.shade200,
  },
});
