import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationDimensions,
  applicationColors,
} from '../../../../../style.css';

export default EStyleSheet.create({
  popupModal: {
    paddingTop: 4,
  },
  container: {
    paddingBottom: 50,
  },
  barContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 12,
  },
  bar: {
    width: 32,
    height: 4,
    borderRadius: 4,
    backgroundColor: applicationColors.neutral.shade300,
  },
  headers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 4,
  },
  headerBtn: {
    width: 50,
    height: 50,
  },
  title: {
    textAlign: 'center',
    width: applicationDimensions.screenWidth - 132,
  },
  divider: {
    height: 1,
    backgroundColor: applicationColors.neutral.shade200,
  },
  icon: {
    marginTop: applicationDimensions.defaultPadding,
  },
  description: {
    marginHorizontal: applicationDimensions.defaultPadding,
    textAlign: 'center',
    marginBottom: applicationDimensions.defaultPadding,
  },
  button: {
    width: applicationDimensions.screenWidth - 32,
    borderRadius: 20,
  },
});
