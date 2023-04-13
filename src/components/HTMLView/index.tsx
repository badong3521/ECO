import React from 'react';
import { ScrollView, View, Linking } from 'react-native';
import HTML from 'react-native-render-html';
import HTMLViewPropTypes from './types';
import Heading from '../Heading';
import styles from './style.css';
import HTMLFastImage from '../HTMLFastImage';
import Text from '../Text';

export default function HTMLView(props: HTMLViewPropTypes) {
  const { html, scrollable, fontStyle, containerStyle } = props;

  const renderers = {
    // @ts-ignore
    h1: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      const { rawChildren, key } = passProps;
      const { data } = rawChildren[0];
      return (
        <View key={key} style={styles.headingContainer}>
          <Heading size="h2" bold="bold">
            {data}
          </Heading>
        </View>
      );
    },
    // @ts-ignore
    h2: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      const { rawChildren, key } = passProps;
      const { data } = rawChildren[0];
      return (
        <View key={key} style={styles.headingContainer}>
          <Heading size="h3" bold="bold">
            {data}
          </Heading>
        </View>
      );
    },
    // @ts-ignore
    h3: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      const { rawChildren, key } = passProps;
      const { data } = rawChildren[0];
      return (
        <View key={key} style={styles.headingContainer}>
          <Heading size="h4" bold="bold">
            {data}
          </Heading>
        </View>
      );
    },
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      const { src } = htmlAttribs;
      const { key } = passProps;
      return <HTMLFastImage key={key} source={src.trim()} />;
    },
    // @ts-ignore
    a: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      const { key } = passProps;
      return (
        <Text>
          {' '}
          <Text key={key} onPress={() => Linking.openURL(htmlAttribs.href)}>
            {passProps.rawChildren[0].data}
          </Text>
        </Text>
      );
    },
  };

  function renderHtml() {
    return (
      <HTML
        onLinkPress={(event, href) =>
          Linking.canOpenURL(href) && Linking.openURL(href)
        }
        html={parseHTML(html || '')}
        renderers={renderers}
        containerStyle={[styles.container, containerStyle]}
        baseFontStyle={fontStyle ?? styles.fontStyle}
      />
    );
  }

  return scrollable ? (
    <ScrollView style={styles.scrollView}>{renderHtml()}</ScrollView>
  ) : (
    renderHtml()
  );
}

// replace new line character with <br> tag
// can be extended
function parseHTML(htmlString: string): string {
  if (!htmlString) return '';
  const CHECK_OFFSET = 10;
  const res = htmlString
    .replace(/\n+/g, (match, offset) => {
      const before = htmlString.slice(offset - CHECK_OFFSET, offset);
      const after = htmlString.slice(offset, offset + CHECK_OFFSET);
      if (/\/.*>/.test(before) || /<.+/.test(after)) {
        return match;
      }
      return '';
    })
    // remove blank lines
    // source: https://stackoverflow.com/questions/16369642/javascript-how-to-use-a-regular-expression-to-remove-blank-lines-from-a-string
    .replace(/^\s*$(?:\r\n?|\n)/gm, '');
  return res;
}

HTMLView.defaultProps = {
  scrollable: true,
};
