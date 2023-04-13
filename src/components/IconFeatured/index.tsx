import React from 'react';
import Icon from '../Icon';
import Badge from '../Badge';
import { applicationColors, applicationDimensions } from '../../../style.css';

type Type = 'icon' | 'badge';

interface Props {
  type: Type;
  text?: string;
}

// Featured icon for cards
export default function IconFeatured(props: Props) {
  const { type, text } = props;

  return (
    <>
      {type === 'icon' && (
        <Icon
          size={applicationDimensions.iconSize}
          // @ts-ignore
          name="staro"
          iconPack="ant"
          color={applicationColors.semantic.info.shade500}
        />
      )}
      {type === 'badge' && (
        <Badge
          type="clear"
          text={text!}
          color={applicationColors.semantic.info.shade500}
          textColor={applicationColors.neutral.shade300}
        />
      )}
    </>
  );
}

IconFeatured.defaultProps = {
  type: 'icon',
};
