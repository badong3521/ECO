import { DefaultTheme } from 'react-native-paper';
import { Dimensions, Platform } from 'react-native';

export class Screen {
  static screenRatio =
    Dimensions.get('window').height / Dimensions.get('window').width;
}

// use for some dimension. Some screen that has the aspect ratio is less than 1.8 should have a smaller dimension
export const scaleFactor = Screen.screenRatio < 1.8 ? 0.75 : 1;

export const applicationColors = {
  primary: {
    shade900: '#26A68D',
    shade700: '#67C1AF',
    shade500: '#B7EEE3',
    shade300: '#E2F8F4',
    shade100: '#F3FCFA',
    black: '#000000',
    white: '#FFFFFF',
    evenWhite: 'rgba(255, 255, 255, 0.7)',
  },
  secondary: {
    shade900: '#986310',
    shade700: '#CB8415',
    shade500: '#FEA51A',
    shade300: '#FEC05F',
    shade100: '#FFF3E0',
    softBlack: 'rgba(0,0,0,0.6)',
    softGrey: 'rgba(139, 140, 147, 0.6)',
    background: '#F7F7F7',
  },
  neutral: {
    shade900: '#383838',
    shade700: '#747474',
    shade500: '#9C9C9C',
    shade300: '#D3D3D3',
    shade200: '#F2F2F2',
    shade150: '#F5F5F5',
    shade100: '#FFFFFF',
  },
  semantic: {
    success: {
      shade900: '#1F7A4C',
      shade700: '#29A366',
      shade500: '#33CC7F',
      shade300: '#A5E8C7',
      shade100: '#DAF6E8',
    },
    error: {
      shade900: '#7A3333',
      shade700: '#AB4747',
      shade500: '#F54E4E',
      shade300: '#F8A3A3',
      shade200: '#ffdcdc',
      shade100: '#FEF0F0',
    },
    info: {
      shade900: '#275D75',
      shade700: '#3682A3',
      shade500: '#4DB9E9',
      shade300: '#A6DCF4',
      shade100: '#DBF1FB',
    },
    warning: {
      shade900: '#997226',
      shade700: '#CC9833',
      shade500: '#FFBE40',
      shade300: '#FFD88C',
      shade100: '#FFF2D9',
    },
  },
  button: {
    primary: '#26A68C',
  },
  disabled: {
    background: '#D8D8D8',
    text: '#8B8B8B',
  },
  misc: {
    polylineActive: '#2C98F0',
    facebook: '#3B5998',
    polyline: 'rgba(139, 140, 147, 0.4)',
  },
  card: {
    purple: '#B4004E',
    orange: '#C63F17',
    green: '#006064',
  },
  bus: {
    enter: '#15BA92',
    exit: '#606060',
    enter_exit: '#5CAACC',
  },
  ecofeedback: {
    pending: '#FFBE40',
    pendingLighter: '#FFF2D9',
    resolve: '#33CC7F',
    resolveLighter: '#DAF6E8',
    new: '#4DB9E9',
    newLighter: '#DBF1FB',
    attachment: {
      background: '#E8FCF4',
    },
    banner: {
      background: 'rgba(218, 255, 239, 0.54)',
      border: 'rgba(38, 166, 141, 0.18)',
    },
  },
  vaccine: {
    statusBag: {
      verified: {
        color: '#2EB35A',
        bgColor: '#E6FFE9',
      },
      verifying: {
        color: '#1990FF',
        bgColor: '#F0FAFF',
      },
      rejected: {
        color: '#B32E33',
        bgColor: '#FFF2F0',
      },
      needUpdate: {
        color: '#FFA940',
        bgColor: '#FFFBF0',
      },
    },
  },
  backgroundColor: '#F9F9FB',
  calendarStatus: {
    notOrdered: {
      color: '#EE7649',
      bgColor: '#FFE9E0',
    },
    ordered: {
      color: '#DDD00C',
      bgColor: '#FFFDE7',
    },
    confimred: {
      color: '#76AA34',
      bgColor: '#EEFFD8',
    },
    success: {
      color: '#3F8E5C',
      bgColor: '#DFFFEB',
    },
    ready: {
      color: '#278CF0',
      bgColor: '#DEEFFF',
    },
    wait: {
      color: '#C039EB',
      bgColor: '#F5DCFD',
    },
    fail: {
      color: '#F9433B',
      bgColor: '#FFE0DF',
    },
    notFinishPayment: {
      color: '#F87C11',
      bgColor: '#FFE8D4',
    },
  },
  secondary2: {
    shade900: '#05A9C7',
    shade100: '#F3FBFC',
  },
};

export const navigationColors = {
  landing: applicationColors.primary.white,
  directory: applicationColors.primary.white,
  bus: applicationColors.primary.white,
  user: applicationColors.primary.white,
  tabLabelColor: applicationColors.primary.shade900,
  inactiveTab: applicationColors.neutral.shade500,
  activeTab: applicationColors.primary.shade900,
};

export const applicationTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: applicationColors.primary.shade900,
    accent: applicationColors.primary.white,
    background: '#FFF',
    underlineColor: 'transparent',
  },
};

export const applicationStyle = {
  body: {
    fontSize: '0.625rem',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.075,
    shadowRadius: 10,
    elevation: 4,
  },
  iconShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bigDivider: {
    backgroundColor: applicationColors.neutral.shade200,
    height: 4,
  },
  smallDivider: {
    backgroundColor: 'rgba(33, 33, 33, 0.08)',
    height: 1,
  },
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
export const applicationDimensions = {
  // icon
  iconSize: 20,
  iconSizeBig: 30,
  iconSizeSmall: 15,

  // padding
  defaultPadding: 16,
  smallPadding: 10,

  // textSize
  textSizeSmall: 12,
  textFontWeight: Platform.OS === 'ios' ? '300' : '100',

  // border
  squareBorderRadius: 8,
  roundBorderRadius: 16,

  navigationBarHeight: 55,
  singleButtonWidth: 180 * scaleFactor,

  // screen
  screenWidth,
  screenHeight,

  // nav
  navHeight: 45,

  // border radius
  borderRadius: {
    default: 12,
  },
};

export const applicationIcons = {
  back: 'chevron-left',
  search: 'search',
  close: 'close',
  arrowRight: 'chevron-right',
  arrowSwap: 'swap-vert',
  edit: 'mode-edit',
};

export const applicationFontFamily =
  Platform.OS === 'android' ? 'cabin_regular' : 'Cabin-Regular';
export const applicationFontFamilyBold =
  Platform.OS === 'android' ? 'cabin_bold' : 'Cabin-Bold';
export const applicationFontFamilySemiBold =
  Platform.OS === 'android' ? 'cabin_semi_bold' : 'Cabin-SemiBold';

export const applicationLoraFontFamily =
  Platform.OS === 'android' ? 'lora_regular' : 'Lora-Regular';
export const applicationLoraFontFamilyBold =
  Platform.OS === 'android' ? 'lora_bold' : 'Lora-Bold';

export const applicationFontWeight = {
  bold: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : undefined,
    fontFamily: applicationFontFamilyBold,
  },
};

export const applicationMaxFontSizeMultiplier = 1.7; // to avoid too big fontScale will break the layout
