import React, { useState } from 'react';
import { LayoutAnimation, ViewStyle } from 'react-native';
import { List } from 'react-native-paper';
import { applicationColors, applicationFontFamily } from '../../../style.css';

interface Props {
  title: string | React.ReactNode;
  children: React.ReactNode; // Content of node
  description?: React.ReactNode;
  onPress?: () => void;
  left?: () => React.ReactNode;
  style?: ViewStyle;
  titleStyle?: ViewStyle;
  expanded?: boolean;
}

export default function Accordion(props: Props) {
  const {
    title,
    children,
    description,
    onPress,
    left,
    style,
    titleStyle,
    expanded,
  } = props;

  const [expand, setExpand] = useState<boolean | undefined>(expanded);

  function onAccordionPress() {
    LayoutAnimation.configureNext(ANIMATE_SPRING);
    setExpand(!expand);
    if (onPress) {
      onPress();
    }
  }

  return (
    <List.Accordion
      title={title}
      description={description}
      onPress={onAccordionPress}
      left={left}
      style={style}
      expanded={expand}
      titleStyle={[
        titleStyle,
        {
          fontFamily: applicationFontFamily,
        },
      ]}
      descriptionStyle={{
        fontFamily: applicationFontFamily,
      }}
      theme={{
        colors: {
          text: applicationColors.secondary.softBlack,
        },
      }}
    >
      {children}
    </List.Accordion>
  );
}

const ANIMATE_SPRING = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeIn,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 1,
  },
  create: {
    type: LayoutAnimation.Types.easeIn,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 1,
  },
};
