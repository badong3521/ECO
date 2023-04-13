import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'utils/statusBar';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

export default StyleSheet.create({
  root: {
    backgroundColor: applicationColors.neutral.shade150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: getStatusBarHeight(),
    backgroundColor: applicationColors.neutral.shade150,
  },
  headerText: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
  },
  iconContainer: {
    padding: applicationDimensions.defaultPadding,
  },
  containerScrollView: {
    paddingBottom: 128 + getStatusBarHeight(),
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#353535',
  },
  itemComponent: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
  },
  txtName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarRowDefault: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  leftText: {
    flex: 5,
  },
  righText: {
    flex: 6,
  },
  line: {
    height: 1,
    backgroundColor: applicationColors.neutral.shade150,
    marginVertical: 10,
  },
  txtNote: {
    color: '#59597C',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 12,
    lineHeight: 22,
  },
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
    paddingHorizontal: 16,
    paddingVertical: 18,
    flex: 1,
    position: 'absolute',
    bottom: getStatusBarHeight() + 56,
    backgroundColor: 'white',
    borderTopColor: applicationColors.neutral.shade200,
    borderTopWidth: 1,
  },
  timeSelect: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E5F0',
    flex: 6,
    paddingVertical: 7,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSelectDisabled: {
    backgroundColor: '#F6F6F6',
  },
  txtTimeSelect: {
    color: applicationColors.neutral.shade700,
    flex: 1,
  },
  txtTimeSelectDisabled: {
    color: '#59597C',
  },
  loading: {
    marginTop: applicationDimensions.defaultPadding,
  },
});
