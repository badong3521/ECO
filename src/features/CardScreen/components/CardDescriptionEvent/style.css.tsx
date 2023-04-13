import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    padding: applicationDimensions.defaultPadding,
    marginTop: -10,
  },
  infoBoxContainer: {
    flexDirection: 'column',
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    width: '80%',
    paddingBottom: 10,
  },
  timeContainer: {
    marginLeft: 5,
  },
  websiteButton: {
    marginHorizontal: 10,
    elevation: 11,
    zIndex: 11,
  },
  eventInformationContainer: {
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  eventTimeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 5,
  },
  eventLocationContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  badgeContainer: {
    alignItems: 'flex-start',
    paddingVertical: applicationDimensions.smallPadding,
  },
  body: {
    margin: applicationDimensions.smallPadding,
  },
  favoriteCount: {
    paddingTop: 5,
  },
  merchant: {
    marginTop: 30,
    marginHorizontal: applicationDimensions.smallPadding,
  },
});
