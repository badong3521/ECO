import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    height: 'auto',
    marginTop: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
  },
  label: {
    paddingLeft: applicationDimensions.defaultPadding,
  },
  noData: {
    textAlign: 'center',
    alignSelf: 'center',
    color: applicationColors.neutral.shade500,
    margin: 30,
  },
});
