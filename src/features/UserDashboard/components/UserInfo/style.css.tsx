import EStyleSheet from 'react-native-extended-stylesheet';
import { getStatusBarHeight } from 'utils/statusBar';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  userContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getStatusBarHeight() + 16,
    marginBottom: applicationDimensions.defaultPadding,
    marginHorizontal: 16,
  },
  avatar: {
    backgroundColor: applicationColors.secondary.background,
    borderRadius: 100,
  },
  contentContainer: {
    flex: 1,
    marginRight: 50,
    marginLeft: applicationDimensions.defaultPadding,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    color: applicationColors.neutral.shade500,
  },
  row: {
    marginTop: applicationDimensions.smallPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContainer: {
    position: 'absolute',
    right: -10,
    top: -20,
  },
  notification: {
    width: 40,
    height: 40,
    backgroundColor: applicationColors.secondary.shade100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  arrowRight: {
    marginTop: 4,
  },
});
