import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: applicationDimensions.defaultPadding / 2,
    marginHorizontal: applicationDimensions.defaultPadding,
    marginBottom: applicationDimensions.defaultPadding,
    flexGrow: 1,
  },
  buttonContainer: {
    flex: 1,
    marginRight: applicationDimensions.defaultPadding,
  },
  customIconButton: {
    borderStyle: 'solid',
    borderWidth: 0.4,
    padding: applicationDimensions.defaultPadding / 2,
    borderRadius: applicationDimensions.squareBorderRadius,
    borderColor: '#c3c3c3',
    width: 40,
    marginHorizontal: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.defaultPadding / 2,
    marginBottom: applicationDimensions.defaultPadding,
  },
});
