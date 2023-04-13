import { StyleSheet } from 'react-native';
import { applicationColors } from '../../../style.css';

export default StyleSheet.create({
  backButton: {
    borderRadius: 100,
    flex: 1,
  },
  backButtonContainer: {
    flex: 1,
    marginRight: 16,
  },
  saveButtonContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    padding: 16,
    flex: 1,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 10000,
  },
  headerModal: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    color: '#353535',
  },
  line: {
    height: 1,
    backgroundColor: applicationColors.neutral.shade200,
  },
  message: {
    marginHorizontal: 25,
    marginTop: 24,
    color: '#606060',
    lineHeight: 22,
    textAlign: 'center',
  },
  image: {
    width: 120,
    alignSelf: 'center',
    marginTop: 16,
  },
  modalStyle: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
