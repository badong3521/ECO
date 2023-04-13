import { StyleSheet } from 'react-native';
import { applicationColors } from '../../../../../style.css';

export default StyleSheet.create({
  cardCalendar: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  txtName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarRowDefault: {
    flexDirection: 'row',
    marginTop: 4,
  },
  leftText: {
    flex: 6,
    fontSize: 13,
  },
  righText: {
    flex: 7,
    fontSize: 13,
  },
  line: {
    height: 1,
    backgroundColor: applicationColors.neutral.shade150,
    marginTop: 10,
    marginBottom: 6,
    marginHorizontal: -16,
  },
  buttonOrder: {
    borderRadius: 100,
    marginTop: 10,
    paddingVertical: 0,
  },
});
