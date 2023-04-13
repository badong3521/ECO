import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationColors } from '../../../../../style.css';

export default EStyleSheet.create({
  wrapper: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#FFF',
    opacity: 0.99,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 2,
    marginBottom: 9,
    overflow: 'hidden',
  },
  cardTitle: {
    color: '#FFF',
    textAlign: 'left',
    marginVertical: 3,
    letterSpacing: 0.5,
  },
  cardSubtitle: {
    color: applicationColors.neutral.shade300,
  },
  cardIconContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
    width: '20%',
  },
  cardContentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
});
