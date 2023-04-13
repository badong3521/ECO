import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    backgroundColor: applicationColors.neutral.shade200,
    paddingRight: applicationDimensions.defaultPadding,
  },
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 116,
    position: 'absolute',
    left: 60,
    height: 50,
  },
  billTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  matchText: {
    color: applicationColors.neutral.shade900,
    marginRight: 5,
    flex: 1,
  },
  billPriceText: {
    textAlign: 'right',
    color: applicationColors.neutral.shade900,
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    position: 'absolute',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    left:
      (Platform.OS === 'ios'
        ? applicationDimensions.smallPadding
        : applicationDimensions.defaultPadding) + 20,
  },
  accordion: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: applicationColors.secondary.background,
  },
  noAccordion: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Platform.OS === 'ios' ? 10 : 8,
  },
  totalContainer: {
    flexDirection: 'row',
    marginRight: 48,
    marginLeft: -23,
    paddingVertical: applicationDimensions.smallPadding,
    borderBottomColor: applicationColors.neutral.shade500,
    borderBottomWidth: 1,
  },
  totalAmount: {
    flex: 1,
    color: applicationColors.neutral.shade900,
  },
  totalQuantity: {
    color: applicationColors.neutral.shade900,
  },
  line: {
    backgroundColor: applicationColors.neutral.shade900,
    height: 1,
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    ...applicationStyle.shadow,
    height: 5,
    backgroundColor: 'rgba(0,0,0,0.05)',
    opacity: Platform.OS === 'ios' ? 0.1 : 0.05,
  },
  lineTop: {
    backgroundColor: applicationColors.neutral.shade500,
    height: 1,
  },
  totalItem: {
    marginLeft: 0,
    flexDirection: 'row',
    paddingVertical: applicationDimensions.smallPadding,
    paddingRight: 0,
  },
});
