import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationDimensions,
  applicationColors,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  sectionTitle: {
    marginHorizontal: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
    color: applicationColors.neutral.shade900,
  },
  memberListItem: {
    padding: applicationDimensions.defaultPadding,
    borderBottomWidth: 1,
    borderColor: applicationColors.neutral.shade300,
  },
});
