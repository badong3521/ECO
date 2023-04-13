import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../style.css';

export default EStyleSheet.create({
  container: {
    paddingVertical: applicationDimensions.defaultPadding,
    paddingHorizontal: applicationDimensions.defaultPadding,
    borderBottomLeftRadius: applicationDimensions.roundBorderRadius,
    borderBottomRightRadius: applicationDimensions.roundBorderRadius,
    justifyContent: 'center',
  },
  attachments: {
    marginTop: applicationDimensions.smallPadding,
  },
});
