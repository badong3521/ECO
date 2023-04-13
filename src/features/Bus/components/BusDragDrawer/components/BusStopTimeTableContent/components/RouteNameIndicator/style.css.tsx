import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../../../../../../../style.css';

export default EStyleSheet.create({
  leftContainer: {
    position: 'absolute',
    justifyContent: 'center',
    top: 110,
    left: 35,
    bottom: 50,
    elevation: 5,
  },
  topIndicator: {
    width: 8,
    height: 8,
    backgroundColor: applicationColors.primary.shade900,
    position: 'absolute',
    right: 4,
    top: -3,
    transform: [{ rotate: '45deg' }],
  },
  bottomIndicator: {
    width: 8,
    height: 8,
    backgroundColor: applicationColors.primary.shade900,
    position: 'absolute',
    right: 4,
    bottom: -3,
    transform: [{ rotate: '45deg' }],
  },
  connectLine: {
    borderColor: applicationColors.primary.shade900,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 10,
    position: 'absolute',
    height: '100%',
    alignSelf: 'flex-end',
    width: '50%',
  },
  routeNameContainer: {
    backgroundColor: applicationColors.primary.shade900,
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'baseline',
    width: 60,
  },
  routeName: {
    color: 'white',
    textAlign: 'center',
  },
});
