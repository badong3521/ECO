module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'], // need for ts project, js don't need this line
        alias: {
          '@assets': '.src/assets',
          '@components': './src/components',
          '@config': './src/config',
          '@features': './src/features',
          '@i18n': './src/i18n',
          '@lib': './src/lib',
          '@navigation': './src/navigation',
          '@reducers': './src/reducers',
          '@services': './src/services',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
