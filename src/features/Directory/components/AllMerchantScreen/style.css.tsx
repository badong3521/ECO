import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  searchBar: {
    backgroundColor: applicationColors.primary.white,
    borderRadius: 12,
    marginTop: -20,
    maxHeight: 60,
    marginHorizontal: applicationDimensions.defaultPadding,
    paddingHorizontal: applicationDimensions.defaultPadding,
    paddingVertical: applicationDimensions.smallPadding,
    marginBottom: applicationDimensions.smallPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarIcon: {
    marginRight: applicationDimensions.defaultPadding,
  },
  searchBarText: {
    color: applicationColors.neutral.shade500,
  },
  background: {
    top: -50,
    left: 100,
  },
  featuredCardContainer: {
    marginBottom: applicationDimensions.defaultPadding,
  },
  categoryList: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.smallPadding,
  },
  merchantCardList: {
    marginHorizontal: applicationDimensions.defaultPadding,
  },
  bookmarkButtonContainer: {
    marginLeft: -applicationDimensions.defaultPadding,
    opacity: 0,
  },
  floatingBookmarkButtonContainer: {
    marginRight: applicationDimensions.defaultPadding,
  },
  rightHeaderContainer: {
    flexDirection: 'row',
    marginRight: applicationDimensions.defaultPadding,
  },
});
