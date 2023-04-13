import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: applicationColors.secondary.background,
  },
  newsCard: {
    width:
      Dimensions.get('window').width - applicationDimensions.defaultPadding * 2,
  },
  list: {
    paddingVertical: applicationDimensions.defaultPadding,
  },
  emptyState: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: '30%',
  },
  bookmarkButtonContainer: {
    marginRight: applicationDimensions.defaultPadding,
  },
});
