import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../style.css';
import { SearchState } from '../../../../reducers/standardSearch';

export default EStyleSheet.create({
  parent: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeList: {
    marginTop: -applicationDimensions.defaultPadding / 2,
  },
  directHereBtn: {
    marginLeft: applicationDimensions.defaultPadding,
    marginRight: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
    borderRadius: applicationDimensions.squareBorderRadius,
  },
});

export const searchBar = (searchState: SearchState) =>
  EStyleSheet.create({
    flex: 1,
    marginLeft:
      searchState !== SearchState.NONE
        ? 0
        : applicationDimensions.defaultPadding,
    marginRight:
      searchState === SearchState.SEARCHING
        ? 0
        : applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
  });
