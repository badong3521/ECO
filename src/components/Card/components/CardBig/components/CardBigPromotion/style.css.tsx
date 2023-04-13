import EStyleSheet from 'react-native-extended-stylesheet';
import {
  applicationColors,
  applicationDimensions,
} from '../../../../../../../style.css';

export default EStyleSheet.create({
  badgeContainer: {
    flexDirection: 'row',
  },
  cardContainer: {
    paddingLeft: applicationDimensions.defaultPadding,
    paddingRight: applicationDimensions.defaultPadding,
    paddingTop: applicationDimensions.defaultPadding,
    height: '99%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 7,
    overflow: 'hidden',
    alignItems: 'flex-start',
  },
  title: {
    marginTop: applicationDimensions.smallPadding,
    fontSize: 24,
  },
  expiredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: applicationDimensions.smallPadding,
  },
  bottom: {
    justifyContent: 'center',
    padding: applicationDimensions.defaultPadding,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  dash: {
    position: 'absolute',
    top: -1,
    left: 0,
    right: 0,
  },
  merchantName: {
    color: applicationColors.primary.white,
  },
});
