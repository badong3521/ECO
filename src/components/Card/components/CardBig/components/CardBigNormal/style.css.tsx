import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  wrapper: {
    flex: 1,
  },
  cardContainer: {
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
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
    height: '100%',
  },
  cardTitle: {
    textAlign: 'left',
    letterSpacing: 1.2,
    color: '#FFF',
    textTransform: 'uppercase',
  },
  cardCategory: {
    textTransform: 'uppercase',
    color: '#49b48c',
  },
  bottomInformation: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gradientContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});
