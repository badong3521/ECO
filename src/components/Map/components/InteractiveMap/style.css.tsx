import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  mapContainer: {
    ...EStyleSheet.absoluteFillObject,
    height: '110%',
  },
  map: {
    ...EStyleSheet.absoluteFillObject,
    minHeight: '100%',
  },
});
