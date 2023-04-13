import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import {
  applicationDimensions,
  applicationColors,
  applicationStyle,
} from '../../../../../style.css';

// Calculate attachment size based on how many we want to show and the device width
const attachmentSize = Dimensions.get('window').width * 0.35;

export default EStyleSheet.create({
  iconSizeBig: applicationDimensions.iconSizeBig,
  iconSize: applicationDimensions.iconSize,
  iconSizeSmall: applicationDimensions.iconSizeSmall,
  iconDeleteColor: '#FFF',
  fileContainer: {
    paddingVertical: 8,
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: applicationDimensions.squareBorderRadius,
    backgroundColor: applicationColors.neutral.shade200,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  bottomBar: {
    backgroundColor: applicationColors.semantic.error.shade500,
    borderBottomLeftRadius: applicationDimensions.roundBorderRadius,
    borderBottomRightRadius: applicationDimensions.roundBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    padding: 3,
  },
  fileTypeName: {
    marginLeft: 5,
    flex: 1,
    color: applicationColors.neutral.shade900,
  },
  deleteButton: {
    ...applicationStyle.iconShadow,
    position: 'absolute',
    top: 2,
    right: 2,
  },
  fileName: {
    maxWidth: attachmentSize,
    marginLeft: applicationDimensions.smallPadding,
  },
  imageContainer: {
    width: 70,
    height: 76,
    marginRight: 8,
    justifyContent: 'center',
  },
  imageFile: {
    backgroundColor: applicationColors.neutral.shade200,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: applicationDimensions.squareBorderRadius,
  },
});
