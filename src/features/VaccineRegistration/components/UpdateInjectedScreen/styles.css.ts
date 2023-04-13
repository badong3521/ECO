import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
  scaleFactor,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: applicationColors.neutral.shade200,
  },
  content: {
    flex: 1,
    marginTop: applicationDimensions.defaultPadding,
    // marginBottom: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.primary.white,
    padding: applicationDimensions.defaultPadding,
  },
  itemRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    paddingLeft: 0,
  },
  footer: {
    justifyContent: 'flex-end',
    padding: applicationDimensions.defaultPadding,
    backgroundColor: applicationColors.primary.white,
    marginTop: applicationDimensions.defaultPadding,
  },
  button: {
    borderRadius: 20,
  },
  rightHeader: {
    width: 56,
    height: 40,
  },
  marginBottom: {
    marginBottom: applicationDimensions.defaultPadding,
  },
  groupRadio: {
    // flexDirection: 'row',
  },
  input: {
    width: '100%',
    backgroundColor: applicationColors.primary.white,
    paddingHorizontal: 16 * scaleFactor,
    paddingVertical: applicationDimensions.smallPadding * scaleFactor,
    color: applicationColors.neutral.shade900,
    fontSize: '1rem',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E5F0',
  },
  contentDate: {
    backgroundColor: '#F6F6F6',
    padding: 12,
    borderRadius: 12,
  },
  inputContainer: {
    marginBottom: applicationDimensions.defaultPadding,
  },
  imageGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loader: {
    paddingTop: applicationDimensions.defaultPadding,
  },
});
