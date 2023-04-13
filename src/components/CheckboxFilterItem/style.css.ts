import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'utils/statusBar';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  accordionContent: {
    backgroundColor: applicationColors.neutral.shade200,
    padding: applicationDimensions.defaultPadding,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    margin: Platform.OS === 'android' ? 10 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Platform.OS === 'ios' ? -3 : 0,
    flex: 1,
  },
  sortText: {
    position: 'absolute',
    left: 42,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: applicationDimensions.smallPadding,
    paddingTop: getStatusBarHeight(),
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: '1.1rem',
  },
  backButton: {
    padding: applicationDimensions.smallPadding,
  },
  filterButton: {
    padding: applicationDimensions.smallPadding,
  },
  checkboxes: {
    marginTop: applicationDimensions.smallPadding,
  },
});
