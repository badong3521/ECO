import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  loader: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.secondary.background,
    flex: 1,
  },
  container: {
    padding: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.secondary.background,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: applicationDimensions.defaultPadding,
  },
  itemText: {
    color: applicationColors.neutral.shade900,
  },
  divider: {
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: applicationColors.neutral.shade300,
    marginHorizontal: applicationDimensions.smallPadding,
    marginBottom: 5,
  },
});
