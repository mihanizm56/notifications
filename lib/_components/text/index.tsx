import React, { FC, memo, useMemo } from 'react';
import classNames from 'classnames/bind';
import { FontSizeType, FontColorType, TagType } from './types';
import style from './index.scss';

const cn = classNames.bind(style);

type PropsType = {
  /** text color */
  color: FontColorType;
  /** text wight flag */
  isBold?: boolean;
  /** text ellipsis flag */
  isEllipsis?: boolean;
  /** text case flag */
  isUpperCase?: boolean;
  /** text size type */
  size: FontSizeType;
  /** tag type */
  tagType?: TagType;
  /** text type */
  text: string;
};

export const Text: FC<PropsType> = memo(
  ({
    color,
    isBold,
    isUpperCase,
    size,
    tagType,
    text,
    isEllipsis,
  }: PropsType) => {
    const TagName = useMemo(() => tagType || 'span', [tagType]);

    return (
      <TagName
        className={cn('Text', {
          [`Text--${size}`]: Boolean(size),
          [`Text--${color}`]: Boolean(color),
          'Text--bold': isBold,
          'Text--uppercase': isUpperCase,
          'Text--ellipsis': isEllipsis,
        })}
        data-name="Text"
      >
        {text}
      </TagName>
    );
  },
);
