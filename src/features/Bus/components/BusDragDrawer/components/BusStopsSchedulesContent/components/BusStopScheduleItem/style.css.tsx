import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../../../style.css';

export default EStyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: applicationDimensions.defaultPadding,
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignSelf: 'baseline',
  },
  container: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
  },
  divider: {
    backgroundColor: applicationColors.neutral.shade200,
    height: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  stopName: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    flex: 1,
  },
  moreStopsLabel: {
    marginLeft: 30,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    color: applicationColors.primary.shade900,
  },
});
export const overWhiteMask = (hasTopRadius: boolean) =>
  EStyleSheet.create({
    backgroundColor: 'white',
    top: '-50%',
    bottom: 0,
    position: 'absolute',
    borderTopLeftRadius: hasTopRadius ? 10 : 0,
    borderBottomLeftRadius: hasTopRadius ? 0 : 10,
    height: '100%',
    alignSelf: 'center',
    left: 2,
    right: 0,
  });
