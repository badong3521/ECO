import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textHeader: {
    marginTop: applicationDimensions.defaultPadding,
  },
  image: {
    width: '50%',
    aspectRatio: 0.84,
    marginTop: 36,
  },
  content: {
    marginTop: 40,
    marginHorizontal: 48,
    textAlign: 'center',
    flex: 1,
  },
  nextButton: {
    height: 48,
    width: applicationDimensions.screenWidth - 32,
    backgroundColor: '#26A68C',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: applicationDimensions.defaultPadding,
  },
});
