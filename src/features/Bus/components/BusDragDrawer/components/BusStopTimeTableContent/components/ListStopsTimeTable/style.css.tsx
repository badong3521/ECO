import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../../../style.css';

export default EStyleSheet.create({
  scrollView: {
    paddingBottom: applicationDimensions.defaultPadding,
  },
  list: {
    marginLeft: 90,
    paddingBottom: 30,
    paddingTop: 30,
    marginTop: 60,
    marginRight: 20,
    elevation: 5,
  },
  noDataContainer: {
    textAlign: 'center',
    margin: 60,
    minHeight: 100,
    justifyContent: 'center',
    color: applicationColors.neutral.shade500,
  },
  subtractContainer: {
    position: 'absolute',
    justifyContent: 'center',
    top: 60,
    right: 20,
    bottom: 0,
    left: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 4,
    marginBottom: 10,
  },
});
