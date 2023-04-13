import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../style.css';

export default EStyleSheet.create({
  description: {
    marginVertical: applicationDimensions.smallPadding,
  },
  content: {
    marginHorizontal: applicationDimensions.defaultPadding,
  },
  row: {
    flexDirection: 'row',
  },
  contactButton: {
    marginRight: applicationDimensions.defaultPadding,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    textTransform: 'uppercase',
  },
});
