import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  about: {
    marginBottom: applicationDimensions.defaultPadding,
  },
  tabViewContainer: {
    marginVertical: applicationDimensions.defaultPadding,
  },
  container: {
    marginTop: -Dimensions.get('screen').width,
    paddingHorizontal: applicationDimensions.defaultPadding,
    width: Dimensions.get('screen').width,
    aspectRatio: 1,
    justifyContent: 'flex-end',
    elevation: 10,
    zIndex: 10,
  },
  favoriteCount: {
    marginTop: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexWrap: 'wrap',
    color: applicationColors.primary.white,
    width:
      Dimensions.get('screen').width -
      applicationDimensions.defaultPadding * 3 -
      40,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: applicationDimensions.smallPadding,
  },
  address: {
    color: applicationColors.primary.white,
    marginLeft: applicationDimensions.defaultPadding,
  },
  closedText: {
    color: applicationColors.semantic.error.shade500,
    marginLeft: applicationDimensions.defaultPadding,
  },
  openText: {
    color: applicationColors.semantic.success.shade500,
    marginLeft: applicationDimensions.defaultPadding,
  },
  infoText: {
    color: applicationColors.neutral.shade100,
  },
  workingHourContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: applicationDimensions.smallPadding,
  },
  workingHours: {
    color: applicationColors.primary.white,
    marginLeft: applicationDimensions.defaultPadding,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  badgeListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: applicationDimensions.smallPadding,
    marginBottom: applicationDimensions.defaultPadding,
    marginHorizontal: -applicationDimensions.defaultPadding,
  },
  badgeList: {
    paddingHorizontal: applicationDimensions.defaultPadding,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.42)',
    paddingBottom: 2,
    paddingTop: 0,
    paddingHorizontal: applicationDimensions.smallPadding,
  },
  contentContainer: {
    paddingTop: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.secondary.background,
  },
  buttonRow: {
    flexDirection: 'row',
    marginHorizontal: applicationDimensions.defaultPadding,
  },
  callButtonContainer: {
    flex: 1,
    marginRight: applicationDimensions.smallPadding,
  },
  directionButtonContainer: {
    flex: 1,
  },
  contactButton: {
    backgroundColor: applicationColors.primary.shade300,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 0,
    elevation: 0,
  },
  contactButtonLabel: {
    color: applicationColors.primary.shade900,
  },
});
