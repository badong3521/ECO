import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  tabContainer: {
    width: '100%',
    marginLeft: 5,
  },
  tab: {
    backgroundColor: applicationColors.secondary.background,
    shadowOpacity: 0,
    marginRight: applicationDimensions.defaultPadding,
    elevation: 0,
  },
  tabStyle: {
    width: 'auto',
    paddingBottom: 0,
    paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicatorStyle: {
    backgroundColor: applicationColors.primary.shade900,
    height: 3,
    borderRadius: 3,
  },
  indicatorContainer: {
    alignItems: 'center',
    marginLeft: applicationDimensions.defaultPadding,
  },
  label: {
    fontWeight: 'bold',
  },
});
