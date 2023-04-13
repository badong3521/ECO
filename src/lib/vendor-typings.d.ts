// Remove TypeScript required types as we do it ourselves
declare module 'react-redux';

// Declase material icons
declare module 'react-native-vector-icons/MaterialIcons';
declare module 'react-native-vector-icons/EvilIcons';
declare module 'react-native-vector-icons/AntDesign';
declare module 'react-native-vector-icons/Feather';

// Declare i18n
declare module 'i18n-js';

declare module 'react-native-material-dropdown';

declare module 'google-polyline';

declare module 'react-native-masonry';

// SVG files
declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';

  const content: React.FunctionComponent<SvgProps>;
}
