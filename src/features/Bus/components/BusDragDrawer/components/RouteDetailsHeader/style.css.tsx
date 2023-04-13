import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    height: 'auto',
  },
  appBarContainer: {
    marginTop: applicationDimensions.defaultPadding,
  },
  routeAndLikeContainer: {
    justifyContent: 'center',
    marginBottom: applicationDimensions.smallPadding,
    marginTop: applicationDimensions.smallPadding,
  },
  itemRouteName: {
    paddingLeft: applicationDimensions.smallPadding,
    color: applicationColors.neutral.shade900,
    fontSize: applicationDimensions.textSizeSmall,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: applicationDimensions.smallPadding,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopColor: applicationColors.neutral.shade200,
    borderTopWidth: 1,
  },
  likeIcon: {
    position: 'absolute',
    right: 0,
  },
  routeName: {
    color: applicationColors.semantic.success.shade500,
  },
  routeNameContainer: {
    backgroundColor: applicationColors.semantic.success.shade100,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
  },
});
