import EStyleSheet from 'react-native-extended-stylesheet';
import { applicationDimensions } from '../../../../../../../style.css';

export default EStyleSheet.create({
  content: {
    paddingBottom: 12,
  },
  imageGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  imageContainer: {
    minHeight: 92,
    width: (applicationDimensions.screenWidth - 80) / 2,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FBFBFB',
    flexDirection: 'row',
    marginRight: applicationDimensions.smallPadding,
    marginBottom: applicationDimensions.smallPadding,
  },
  imageText: {
    marginLeft: 8,
  },
  detailsText: {
    marginBottom: 8,
  },
});
