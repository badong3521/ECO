import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { applicationDimensions } from '../../../../../../../style.css';

export default EStyleSheet.create({
  fill: {
    flex: 1,
  },
  scrollView: {
    margin: applicationDimensions.defaultPadding,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: applicationDimensions.defaultPadding,
    marginHorizontal: applicationDimensions.defaultPadding,
  },
  button: {
    borderRadius: applicationDimensions.roundBorderRadius,
  },
  syncButton: {
    flex: 1,
    marginRight: applicationDimensions.defaultPadding,
  },
  extendButton: {
    borderRadius: applicationDimensions.roundBorderRadius,
  },
  emptyState: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.7,
  },
});
