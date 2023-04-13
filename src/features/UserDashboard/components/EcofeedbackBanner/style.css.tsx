import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    flexDirection: 'row',
    borderRadius: applicationDimensions.roundBorderRadius,
    marginLeft: 16,
    marginRight: 16,
    paddingVertical: applicationDimensions.defaultPadding,
    paddingHorizontal: 22,
    backgroundColor: applicationColors.secondary.shade100,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 23,
  },
  description: {
    color: applicationColors.neutral.shade700,
    marginTop: 5,
  },
  sendFeedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: applicationDimensions.defaultPadding,
  },
  sendFeedbackButton: {
    color: applicationColors.secondary.shade500,
  },
});
