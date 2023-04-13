import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export const HEADER_BAR_HEIGHT = 60;

export default EStyleSheet.create({
  headerContainer: {
    marginBottom: applicationDimensions.defaultPadding,
  },
  footerContainer: {
    marginVertical: applicationDimensions.defaultPadding,
  },
  cardContainer: {
    marginBottom: applicationDimensions.smallPadding,
    marginHorizontal: applicationDimensions.defaultPadding,
  },
  searchBar: {
    backgroundColor: applicationColors.primary.white,
    borderRadius: 12,
    height: 40,
    position: 'absolute',
    left: 0,
    right: 0,
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
  root: {
    backgroundColor: applicationColors.secondary.background,
    flex: 1,
  },
  appBar: {
    position: 'absolute',
    width: '100%',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  greeting: {
    position: 'absolute',
  },
  rightHeader: {
    position: 'absolute',
    top: getStatusBarHeight(),
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: HEADER_BAR_HEIGHT,
    zIndex: 2,
    elevation: 2,
  },
  floatingRightHeader: {
    top: getStatusBarHeight(),
    right: 0,
    height: HEADER_BAR_HEIGHT,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    elevation: 5,
  },
  stickHeaderContainer: {
    alignItems: 'flex-end',
    marginTop: -getStatusBarHeight(),
    height: HEADER_BAR_HEIGHT + getStatusBarHeight(),
    justifyContent: 'center',
  },
  backButton: {
    marginTop: getStatusBarHeight(),
    width: HEADER_BAR_HEIGHT,
    height: HEADER_BAR_HEIGHT,
    position: 'absolute',
    zIndex: 5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsCard: {
    width:
      Dimensions.get('window').width - applicationDimensions.defaultPadding * 2,
  },
  tabContainer: {
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    top: getStatusBarHeight(),
    alignSelf: 'center',
    justifyContent: 'center',
    height: HEADER_BAR_HEIGHT,
    alignItems: 'center',
  },
});
