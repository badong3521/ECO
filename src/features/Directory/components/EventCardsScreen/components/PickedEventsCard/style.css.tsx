import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    marginHorizontal: applicationDimensions.defaultPadding,
    ...applicationStyle.shadow,
    backgroundColor: applicationColors.primary.white,
    borderRadius: applicationDimensions.roundBorderRadius,
    flexDirection: 'row',
    marginTop: -100,
  },
  dateContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 25,
  },
  eventsContainer: {
    flex: 1,
    padding: applicationDimensions.defaultPadding,
  },
  divider: {
    width: 1,
    backgroundColor: applicationColors.neutral.shade200,
    marginVertical: applicationDimensions.defaultPadding,
  },
  month: {
    color: applicationColors.secondary.shade500,
  },
  eventContainer: {
    flexDirection: 'row',
    paddingVertical: applicationDimensions.smallPadding,
    alignItems: 'center',
  },
  indicator: {
    width: 6,
    borderRadius: 5,
    position: 'absolute',
    borderColor: applicationColors.primary.shade900,
    height: 16,
    backgroundColor: applicationColors.primary.shade900,
    top: 15,
  },
  eventName: {
    marginLeft: applicationDimensions.defaultPadding,
    flex: 1,
  },
  noSpecialEvent: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 120,
  },
  noSpecialEventsText: {
    flex: 1,
  },
  noEventLogo: {
    width: 100,
    height: 85,
  },
});
