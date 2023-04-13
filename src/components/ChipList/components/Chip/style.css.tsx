import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  chip: {
    minWidth: 80,
    alignSelf: 'baseline',
    backgroundColor: applicationColors.neutral.shade200,
    marginLeft: 5,
    marginRight: 5,
    marginTop: applicationDimensions.smallPadding,
    marginBottom: applicationDimensions.smallPadding,
    borderRadius: applicationDimensions.roundBorderRadius,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    textAlign: 'center',
  },
  selectItem: {
    backgroundColor: applicationColors.semantic.success.shade100,
    color: applicationColors.semantic.success.shade500,
  },
  selectedText: {
    color: applicationColors.semantic.success.shade500,
  },
});
