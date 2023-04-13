import { LayoutAnimation, TextStyle, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import IconComponent from '../../../components/Icon';
import { applicationColors } from '../../../../style.css';
import Text from '../../../components/Text';
import TouchableComponent from '../../../components/TouchableComponent';
import styles from './style.css';
import Constants from '../../../utils/constants';

interface Props {
  children: string | string[] | React.ReactNode[];
  numberOfLines: number;
  textStyle?: TextStyle | TextStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
}

// expandable text component with layout animation
export default function ReadMoreText(props: Props) {
  const { numberOfLines, children, textStyle, containerStyle } = props;
  const [expanded, setExpanded] = useState<boolean>(true);
  const [expandedNumberOfLines, setExpandedNumberOfLines] = useState<number>();

  function onTextLayout(event: any) {
    if (!expandedNumberOfLines) {
      LayoutAnimation.configureNext(Constants.CUSTOM_ANIMATE_SPRING);
      setExpandedNumberOfLines(event.nativeEvent.lines.length);
      setExpanded(false);
    }
  }

  // onTextLayout only runs on load; hence, we won't know the full length of the text in the beginning; hence this condition
  return expandedNumberOfLines && expandedNumberOfLines > numberOfLines ? (
    <TouchableComponent
      onPress={e => {
        if (e) {
          e.stopPropagation();
        }
        LayoutAnimation.configureNext(Constants.CUSTOM_ANIMATE_SPRING);
        setExpanded(!expanded);
      }}
    >
      <View style={[styles.containerExpandable, containerStyle]}>
        <IconComponent
          size={10}
          name={expanded ? 'caretdown' : 'caretright'}
          iconPack="ant"
          color={applicationColors.primary.shade900}
          style={styles.expandIcon}
        />
        <Text
          numberOfLines={expanded ? undefined : numberOfLines}
          fontSize="small"
          style={[styles.textExpandable, textStyle]}
        >
          {children}
        </Text>
      </View>
    </TouchableComponent>
  ) : (
    <View style={[styles.container, containerStyle]}>
      <Text
        numberOfLines={expanded ? undefined : numberOfLines}
        fontSize="small"
        onTextLayout={onTextLayout}
        style={textStyle}
      >
        {children}
      </Text>
    </View>
  );
}
