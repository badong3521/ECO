import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    width: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: applicationDimensions.defaultPadding,
    paddingTop: applicationDimensions.defaultPadding,
  },
  fromPoint: {
    width: 10,
    height: 10,
    backgroundColor: applicationColors.semantic.info.shade500,
  },
  toPoint: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: applicationColors.semantic.error.shade500,
  },
  connectLine: {
    flex: 1,
    width: 2,
    backgroundColor: applicationColors.neutral.shade300,
    alignSelf: 'center',
    margin: 5,
  },
});
