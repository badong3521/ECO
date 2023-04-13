import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  container: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconPadding: {
    position: 'absolute',
    left: 0,
    margin: 0,
  },
  title: {
    marginLeft: 50,
    marginRight: 50,
  },
  titleText: {
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: applicationColors.semantic.error.shade500,
    position: 'absolute',
    right: applicationDimensions.defaultPadding,
    borderRadius: 40,
  },
});
