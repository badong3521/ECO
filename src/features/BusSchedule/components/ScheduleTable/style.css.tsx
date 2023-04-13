import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../style.css';

const fontScale: number =
  Platform.OS === 'ios' ? Dimensions.get('screen').fontScale : 1;
const headerHeight = 35 * fontScale;
const rowHeight = 45 * fontScale;
const cellWidth = 60 * fontScale;
export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: applicationDimensions.defaultPadding,
  },
  header: {
    justifyContent: 'center',
    height: headerHeight,
    alignItems: 'center',
    width: cellWidth,
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    width: cellWidth,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    height: rowHeight,
    borderBottomColor: applicationColors.neutral.shade300,
  },
  rowHeader: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    height: headerHeight,
    borderBottomColor: applicationColors.neutral.shade300,
  },
  stopNameContainer: {
    height: rowHeight,
    color: applicationColors.neutral.shade900,
    alignItems: 'center',
    flexDirection: 'row',
  },
  stopName: {
    marginLeft: 10,
    marginRight: 5,
    flex: 1,
    color: applicationColors.neutral.shade900,
  },
  stopPoint: {
    color: applicationColors.neutral.shade900,
  },
  stopPointContainer: {
    height: headerHeight,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: applicationColors.neutral.shade300,
  },
  stopsName: {
    borderRightWidth: 0.5,
    borderRightColor: applicationColors.neutral.shade300,
  },
  scrollView: {
    width: Dimensions.get('screen').width * 0.45,
  },
  tableContainer: {
    borderRightWidth: 0.5,
    borderRightColor: applicationColors.neutral.shade300,
  },
});
