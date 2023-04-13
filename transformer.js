/* eslint-disable import/no-extraneous-dependencies */
const svgTransformer = require('react-native-svg-transformer');
const typescriptTransformer = require('react-native-typescript-transformer');
const upstreamTransformer = require('metro-react-native-babel-transformer');
/* eslint-enable import/no-extraneous-dependencies */

module.exports.transform = ({ src, filename, options }) => {
  if (filename.endsWith('.ts') || filename.endsWith('.tsx')) {
    return typescriptTransformer.transform({ src, filename, options });
  }
  if (filename.endsWith('.svg')) {
    return svgTransformer.transform({ src, filename, options });
  }
  return upstreamTransformer.transform({ src, filename, options });
};
