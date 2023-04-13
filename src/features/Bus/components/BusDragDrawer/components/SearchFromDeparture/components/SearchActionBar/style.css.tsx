import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    marginTop: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: applicationDimensions.smallPadding,
  },
  inputs: {
    flex: 1,
    flexDirection: 'column',
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 0,
    backgroundColor: applicationColors.neutral.shade200,
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.smallPadding,
  },
  currentLocationButton: {
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'stretch',
    flex: 1,
  },
  currentLocationText: {
    color: applicationColors.semantic.info.shade500,
  },
  chooseOnMapText: {
    color: applicationColors.neutral.shade900,
  },
  chooseOnMapButton: {
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'stretch',
    flex: 1,
  },
  padding: {
    padding: 10,
  },
  label: {
    padding: applicationDimensions.defaultPadding,
  },
  swapButton: {
    padding: 19,
  },
  list: {
    alignSelf: 'flex-start',
    width: '100%',
  },
  busShortcutBar: {
    marginTop: -applicationDimensions.defaultPadding,
  },
});
