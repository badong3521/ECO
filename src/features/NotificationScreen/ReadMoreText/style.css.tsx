import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../style.css';

export default EStyleSheet.create({
  containerExpandable: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textExpandable: {
    width: '90%',
  },
  expandIcon: {
    marginRight: applicationDimensions.smallPadding,
    marginTop: 5,
  },
  container: {
    width: '90%',
  },
});
