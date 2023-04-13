import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  checkboxContainer: {
    position: 'absolute',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    left:
      Platform.OS === 'ios'
        ? applicationDimensions.smallPadding
        : applicationDimensions.defaultPadding,
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthBillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 100,
    position: 'absolute',
    left: 45,
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
