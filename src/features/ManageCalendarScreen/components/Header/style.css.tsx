import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'utils/statusBar';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: getStatusBarHeight(),
    backgroundColor: applicationColors.neutral.shade150,
  },
  headerText: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
  },
  iconContainer: {
    padding: applicationDimensions.defaultPadding,
  },
});
