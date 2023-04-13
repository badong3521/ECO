import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: applicationColors.secondary.background,
  },
  list: {
    flex: 1,
  },
  month: {
    paddingLeft: applicationDimensions.defaultPadding,
    paddingVertical: applicationDimensions.smallPadding,
    backgroundColor: applicationColors.secondary.background,
  },
  footer: {
    marginBottom: applicationDimensions.defaultPadding,
  },
  noData: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '40%',
    textAlign: 'center',
  },
});
