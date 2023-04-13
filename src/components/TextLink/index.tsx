import React from 'react';
import { TextStyle } from 'react-native';
import Text from '../Text';

interface TextLinkProps {
  children: string;
  linkColor: string;
  onLinkPress?: () => void;
  fontSize?: 'tiny' | 'small' | 'large'; // Normal is assumed no fontSize
  style?: TextStyle;
}

// Use this component when you want to show a text that contains some links.
// It's lighter than HtmlView because HtmlView is rendering a small webview
// Fx: `<TextLink>This is [term] for app [Ecoone]</TextLink>`
//  `term` and `Ecoone` will have `linkColor`
// if onLinkPress is defined, whole TextLink can be clickable instead of only link can clickable.
// because if only `term` or `Ecoone` can clickable, it has small area to click
export default function TextLink(props: TextLinkProps) {
  const { children, linkColor, onLinkPress, fontSize, style } = props;

  // parse text into array of normal text and link components
  function renderChildren(): any {
    const arr: any = [];
    let text: string | undefined;
    for (let i = 0; i < children.length; i += 1) {
      // `[` is sign for start of link
      if (children[i] === '[') {
        text = '';
      } else if (children[i] === ']') {
        // `]` is sign for end of link, then push link component to children
        arr.push(
          <Text
            fontSize={fontSize}
            key={i.toString()}
            style={[{ color: linkColor }]}
            bold="bold"
          >
            {text!.toString()}
          </Text>,
        );
        text = undefined;
      } else if (text !== undefined) {
        text = text.concat(children[i]);
      } else {
        arr.push(children[i]);
      }
    }
    return arr;
  }

  return (
    <Text
      style={{
        textDecorationLine: 'none',
        ...style,
      }}
      onPress={onLinkPress}
      fontSize={fontSize}
    >
      {renderChildren()}
    </Text>
  );
}
