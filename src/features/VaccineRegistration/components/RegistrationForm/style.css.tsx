import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

const { width: screenWidth } = Dimensions.get('screen');

export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  stepIndicator: {
    paddingVertical: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.neutral.shade150,
  },
  formContainer: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.defaultPadding,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E5F0',
  },
  isRegisterOthers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginDefault: {
    marginBottom: applicationDimensions.defaultPadding,
  },
  checkboxContainer: {
    marginLeft: 0,
  },
  checkbox: {
    width: applicationDimensions.iconSize,
    height: applicationDimensions.iconSize,
  },
  labelInput: {},
  inputDataPicker: {
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E5F0',
    paddingTop: 0,
  },
  iconDatePicker: {
    position: 'absolute',
    right: 8,
    bottom: 13,
  },
  marginNone: {
    marginTop: 0,
  },
  groupRadio: {
    flexDirection: 'row',
  },
  itemRadio: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  radioButton: {
    paddingLeft: 0,
  },
  containerDropdown: {
    borderWidth: 1,
    borderColor: applicationColors.neutral.shade300,
  },
  content: {
    backgroundColor: '#F6F6F6',
    padding: 12,
    borderRadius: 12,
  },
  imageGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageContainer: {
    minHeight: 92,
    width: (screenWidth - 80) / 2,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FBFBFB',
    flexDirection: 'row',
  },
  imageText: {
    marginLeft: 8,
  },
  nextButton: {
    height: 48,
    width: '100%',
    backgroundColor: '#26A68C',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStep: {
    flex: 1,
    width: applicationDimensions.screenWidth,
  },
  loader: {
    paddingTop: applicationDimensions.defaultPadding,
  },
});
