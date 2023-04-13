import React, { ReactNode, RefObject, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Tooltip as RTooltip } from 'react-native-elements';
import { applicationColors, applicationDimensions } from '../../../style.css';
import Text from '../Text';

interface PropTypes {
  title: string;
  children: ReactNode;
  details?: string;
  tooltipRef?: RefObject<any>;
}

export default function Tooltip(props: PropTypes) {
  const { title, children, details, tooltipRef } = props;
  const [height, setHeight] = useState<number>(125);
  const [width, setWidth] = useState<number>(
    Dimensions.get('screen').width * 0.75 -
      applicationDimensions.defaultPadding * 2,
  );
  const [display, setDisplay] = useState<boolean>(false);

  return (
    <RTooltip
      ref={tooltipRef}
      popover={
        <View
          onLayout={e => {
            setHeight(
              e.nativeEvent.layout.height +
                applicationDimensions.smallPadding * 2,
            );
            setWidth(
              Math.min(
                width,
                e.nativeEvent.layout.width +
                  applicationDimensions.defaultPadding * 2,
              ),
            );
            setDisplay(true);
          }}
        >
          <Text
            bold="bold"
            fontSize="small"
            style={{ color: applicationColors.primary.white }}
          >
            {title}
          </Text>
          {details && (
            <Text
              fontSize="small"
              style={{ color: applicationColors.primary.white, opacity: 0.6 }}
            >
              {details}
            </Text>
          )}
        </View>
      }
      width={width}
      height={height}
      backgroundColor={applicationColors.primary.shade900}
      withOverlay={false}
      highlightColor="transparent"
      containerStyle={{ opacity: display ? 1 : 0 }}
      withPointer={display}
    >
      {children}
    </RTooltip>
  );
}
