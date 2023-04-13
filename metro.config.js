/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const { getDefaultConfig } = require('metro-config');

const jsoMetroPlugin = require('obfuscator-io-metro-plugin')(
  {
    compact: false,
    sourceMap: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    shuffleStringArray: true,
    splitStrings: true,
    stringArrayThreshold: 1,
  },
  {
    runInDev: false,
    sourceMapLocation: './android/app/build/tmp/index.android.bundle.map',
    // logObfuscatedFiles: true /* optional generated files will be located at ./.jso */
  },
);

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('./transformer.js'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
          resetCache: true,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(
        ext => ext !== 'svg' && ext !== 'ts' && ext !== 'tsx',
      ),
      sourceExts: [...sourceExts, 'svg', 'ts', 'tsx'],
    },
    ...jsoMetroPlugin,
  };
})();
