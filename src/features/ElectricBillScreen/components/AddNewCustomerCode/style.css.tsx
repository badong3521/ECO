import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
  applicationStyle,
} from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: applicationColors.secondary.background,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: applicationColors.primary.white,
    marginTop: 1,
    ...applicationStyle.shadow,
  },
  logo: {
    margin: applicationDimensions.defaultPadding,
  },
  bannerContent: {
    flex: 1,
    paddingVertical: applicationDimensions.defaultPadding,
    paddingRight: applicationDimensions.smallPadding,
  },
  content: {
    padding: applicationDimensions.defaultPadding * 2,
    flex: 1,
  },
  notes: {
    flexDirection: 'row',
    paddingVertical: applicationDimensions.defaultPadding,
  },
  textNote: {
    flex: 1,
    paddingLeft: applicationDimensions.smallPadding,
  },
  button: {
    marginHorizontal: applicationDimensions.defaultPadding * 2,
    marginBottom: applicationDimensions.defaultPadding,
    borderRadius: applicationDimensions.roundBorderRadius,
  },
});
