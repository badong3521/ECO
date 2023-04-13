import { StatusBar, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions, applicationColors } from '../../../style.css';

export default EStyleSheet.create({
  safeAreaView: {
    backgroundColor: applicationColors.primary.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    backgroundColor: applicationColors.primary.white,
    height: applicationDimensions.navHeight,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: applicationColors.neutral.shade300,
    borderBottomWidth: 1,
  },
  button: {
    height: applicationDimensions.navHeight,
    margin: 0,
    elevation: 0,
    shadowOpacity: 0,
    width: 35,
    paddingHorizontal: 24,
  },
  header: {
    maxWidth: applicationDimensions.screenWidth - 150,
  },
});
