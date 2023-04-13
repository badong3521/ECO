import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: applicationColors.neutral.shade150,
  },
  scrollView: {
    padding: applicationDimensions.defaultPadding,
  },
  desc: {
    marginTop: applicationDimensions.smallPadding,
    marginBottom: 30,
  },
  button: {
    marginHorizontal: applicationDimensions.defaultPadding,
    borderRadius: applicationDimensions.roundBorderRadius,
    marginVertical: applicationDimensions.defaultPadding,
  },
  itemContainer: {
    backgroundColor: applicationColors.primary.white,
    marginBottom: applicationDimensions.defaultPadding,
    borderRadius: applicationDimensions.roundBorderRadius,
    padding: applicationDimensions.defaultPadding,
  },
  cardNumber: {
    marginTop: applicationDimensions.smallPadding,
  },
  checkbox: {
    position: 'absolute',
    right: applicationDimensions.defaultPadding,
    top: applicationDimensions.defaultPadding,
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
