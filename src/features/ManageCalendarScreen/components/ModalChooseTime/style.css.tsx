import { StyleSheet } from 'react-native';
import { applicationColors } from '../../../../../style.css';

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
  contentContainerStyle: {
    paddingTop: 16,
  },
  note: {
    marginHorizontal: 25,
    color: '#59597C',
    fontStyle: 'italic',
    marginTop: 24,
    lineHeight: 22,
    textAlign: 'center',
  },
  timeItem: {
    paddingVertical: 8,
    marginVertical: 2,
    alignItems: 'center',
    marginHorizontal: 56,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
  },
  timeChosenItem: {
    borderColor: applicationColors.primary.shade900,
  },
  txtTimeSlot: {
    color: '#606060',
  },
  modalStyle: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
