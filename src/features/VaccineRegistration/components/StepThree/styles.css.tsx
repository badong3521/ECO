import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../style.css';

export default EStyleSheet.create({
  formContainer: {
    //   paddingHorizontal: applicationDimensions.defaultPadding,
    marginTop: applicationDimensions.defaultPadding,
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  rowInfoLeft: {
    width: '50%',
  },
  rowInfoRight: {
    width: '50%',
    textAlign: 'right',
  },
  imageCMT: {
    height: 45,
    width: 72,
    marginLeft: 8,
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: applicationDimensions.defaultPadding,
    marginHorizontal: applicationDimensions.defaultPadding,
  },
  button: {
    height: 48,
    width: (applicationDimensions.screenWidth - 48) / 2,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3FBFC',
    borderWidth: 1,
    borderColor: '#05A9C7',
  },
  buttonText: {
    color: '#05A9C7',
  },
  primaryButton: {
    backgroundColor: '#26A68C',
  },
});
