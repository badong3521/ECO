import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: applicationColors.secondary.background,
  },
  background: {
    height: '35%',
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    bottom: 0,
  },
  buttonContainer: {
    width: 169,
    borderRadius: 100,
    marginTop: applicationDimensions.smallPadding,
    backgroundColor: applicationColors.semantic.info.shade500,
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
