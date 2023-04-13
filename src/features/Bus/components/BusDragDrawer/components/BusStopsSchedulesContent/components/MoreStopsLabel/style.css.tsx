import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../../../../../../../style.css';

export default EStyleSheet.create({
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignSelf: 'baseline',
  },
  moreStopsLabel: {
    marginLeft: 30,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    color: applicationColors.semantic.info.shade700,
  },
});
