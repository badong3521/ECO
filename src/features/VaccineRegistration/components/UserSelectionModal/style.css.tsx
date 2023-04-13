import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    paddingBottom: 50,
  },
  headers: {
    marginTop: -10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    marginRight: -15,
  },
  divider: {
    height: 1,
    backgroundColor: applicationColors.neutral.shade200,
  },
});
