import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    paddingVertical: 20,
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: applicationColors.neutral.shade900,
    marginLeft: applicationDimensions.defaultPadding,
    fontWeight: '500',
  },
  desc: {
    color: applicationColors.neutral.shade500,
    marginLeft: applicationDimensions.smallPadding,
  },
  line: {
    height: 1,
    backgroundColor: applicationColors.neutral.shade200,
    position: 'absolute',
    left: 48,
    right: 5,
    bottom: 0,
  },
  badgeContainer: {
    marginLeft: 4,
  },
  bookmarkBadge: {
    backgroundColor: applicationColors.secondary.shade500,
  },
});
