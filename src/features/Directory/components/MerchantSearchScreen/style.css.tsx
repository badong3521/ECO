import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: applicationColors.secondary.background,
  },
  searchBar: {
    backgroundColor: applicationColors.primary.white,
    borderRadius: 12,
    paddingVertical: Platform.OS === 'ios' ? 5 : 0,
    borderColor: applicationColors.primary.white,
  },
  flatList: {
    marginTop: applicationDimensions.defaultPadding,
  },
  flatListContentContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    marginBottom: applicationDimensions.smallPadding,
    marginHorizontal: applicationDimensions.defaultPadding,
  },
});
