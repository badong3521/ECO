import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { applicationColors } from '../../../../../../../style.css';

export default EStyleSheet.create({
  monthBillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 70,
    position: 'absolute',
    left: 15,
    height: 50,
  },
  matchText: {
    flex: 1,
    color: applicationColors.neutral.shade900,
  },
  priceText: {
    color: applicationColors.semantic.info.shade500,
  },
  accordion: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: applicationColors.secondary.background,
  },
});
