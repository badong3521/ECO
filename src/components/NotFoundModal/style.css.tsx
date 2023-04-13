import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors, applicationDimensions } from '../../../style.css';

export default EStyleSheet.create({
  container: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    paddingBottom: 50,
  },
  headers: {
    marginTop: -10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    alignItems: 'center',
  },
  closeButton: {
    marginRight: -15,
  },
  divider: {
    height: 1,
    backgroundColor: applicationColors.neutral.shade200,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginVertical: applicationDimensions.defaultPadding * 1.5,
  },
  header: {
    padding: applicationDimensions.defaultPadding,
    paddingBottom: applicationDimensions.smallPadding,
    textAlign: 'center',
  },
  details: {
    paddingHorizontal: applicationDimensions.defaultPadding,
    paddingBottom: applicationDimensions.defaultPadding,
    textAlign: 'center',
  },
  button: {
    borderRadius: applicationDimensions.roundBorderRadius,
  },
});
