import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default EStyleSheet.create({
  greenColor: applicationColors.primary.shade900,
  container: {
    marginVertical: applicationDimensions.defaultPadding,
  },
  labelInput: {
    marginTop: 24,
  },
  subTitle: {
    backgroundColor: applicationColors.neutral.shade200,
    borderRadius: applicationDimensions.roundBorderRadius,
    paddingVertical: applicationDimensions.smallPadding,
    paddingHorizontal: applicationDimensions.defaultPadding,
  },
  description: {
    minHeight: 100,
    maxHeight: 200,
    flex: 1,
    backgroundColor: applicationColors.neutral.shade200,
    borderRadius: applicationDimensions.roundBorderRadius,
    paddingVertical: applicationDimensions.defaultPadding,
    paddingHorizontal: applicationDimensions.defaultPadding,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 50,
    marginBottom: 50,
    borderRadius: applicationDimensions.roundBorderRadius,
  },
  uploadButtonContainer: {
    flexDirection: 'row',
  },
  uploadButton: {
    marginBottom: 5,
    marginTop: applicationDimensions.smallPadding,
    paddingHorizontal: applicationDimensions.smallPadding,
    borderRadius: applicationDimensions.roundBorderRadius,
  },
  label: {
    color: applicationColors.primary.shade900,
  },
  imageList: {
    marginTop: applicationDimensions.smallPadding,
  },
});
