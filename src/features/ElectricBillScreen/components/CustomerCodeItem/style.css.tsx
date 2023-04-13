import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  codeItem: {
    backgroundColor: applicationColors.secondary.background,
    marginBottom: applicationDimensions.defaultPadding,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: applicationColors.button.primary,
    padding: applicationDimensions.smallPadding,
    borderTopLeftRadius: applicationDimensions.roundBorderRadius,
    borderTopRightRadius: applicationDimensions.roundBorderRadius,
  },
  itemContent: {
    backgroundColor: applicationColors.primary.white,
    borderBottomLeftRadius: applicationDimensions.roundBorderRadius,
    borderBottomRightRadius: applicationDimensions.roundBorderRadius,
  },
  itemHeaderDisabled: {
    backgroundColor: applicationColors.disabled.background,
  },
  customerCode: {
    flex: 1,
  },
  contentGroup: {
    flexDirection: 'row',
    padding: applicationDimensions.smallPadding,
    alignItems: 'center',
  },
  contentText: {
    paddingLeft: applicationDimensions.smallPadding,
    flex: 1,
  },
});
