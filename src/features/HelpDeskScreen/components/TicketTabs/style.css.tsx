import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: applicationColors.secondary.background,
  },
  heading: {
    marginLeft: 2,
    marginBottom: applicationDimensions.smallPadding,
  },
  noTicketsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  noTickets: {
    textAlign: 'center',
    marginTop: applicationDimensions.smallPadding,
  },
  buttonContainer: {
    paddingVertical: applicationDimensions.defaultPadding,
    ...applicationStyle.shadow,
    backgroundColor: applicationColors.primary.white,
  },
  button: {
    borderRadius: applicationDimensions.roundBorderRadius,
    marginHorizontal: applicationDimensions.defaultPadding,
  },
  tabContainer: {
    width: '100%',
  },
  list: {
    padding: applicationDimensions.defaultPadding,
  },
  tab: {
    backgroundColor: applicationColors.primary.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    width: '100%',
  },
  listContainer: {
    flex: 1,
  },
  tabIndicator: {
    marginBottom: -2,
  },
  emptyImage: {
    width: '50%',
    aspectRatio: 1,
    marginBottom: applicationDimensions.smallPadding,
  },
});
