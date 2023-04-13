import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'utils/statusBar';
import { applicationDimensions } from '../../../style.css';

export default StyleSheet.create({
  root: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingTop: getStatusBarHeight(),
  },
  header: {
    fontSize: 24,
    marginHorizontal: 24,
    marginBottom: 12,
    color: '#000',
  },
  iconContainer: {
    padding: applicationDimensions.defaultPadding,
  },
  contentContainer: {
    paddingTop: 12,
  },
});
