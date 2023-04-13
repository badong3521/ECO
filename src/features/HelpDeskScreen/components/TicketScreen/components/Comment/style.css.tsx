import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationDimensions,
  applicationColors,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  comment: {
    borderRadius: applicationDimensions.roundBorderRadius,
    backgroundColor: applicationColors.primary.white,
    marginRight: applicationDimensions.defaultPadding,
    marginLeft: applicationDimensions.defaultPadding,
  },
  createdAtSupport: {
    alignItems: 'flex-start',
  },
  createdAtUser: {
    alignItems: 'flex-end',
  },
  createdAtContainer: {
    marginHorizontal: applicationDimensions.defaultPadding,
  },
  createdAt: {
    marginTop: 7,
    marginRight: 5,
  },
});
