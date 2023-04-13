import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationDimensions,
  applicationColors,
  applicationStyle,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  infoCard: {
    ...applicationStyle.shadow,
    borderRadius: 12,
    marginHorizontal: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.primary.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: applicationDimensions.defaultPadding,
    marginBottom: 30,
  },
  totalAmountContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: applicationDimensions.smallPadding,
  },
  spacer: {
    flexBasis: 1,
    flexGrow: 1,
  },
  totalAmount: {
    color: applicationColors.semantic.info.shade500,
    paddingHorizontal: applicationDimensions.smallPadding,
  },
  row: {
    flexDirection: 'row',
  },
  leftButtonContainer: {
    flex: 1,
    marginRight: applicationDimensions.defaultPadding,
  },
  buttonContainer: {
    flex: 1,
  },
  historyButton: {
    borderRadius: 100,
    backgroundColor: applicationColors.semantic.info.shade100,
  },
  payButton: {
    borderRadius: 100,
  },
});
