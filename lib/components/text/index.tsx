import React, { Props, FC } from 'react';
import classNames from 'classnames/bind';
import styles from '../../styles/index.module.css';
import { FontSizeType, FontColorType } from '../_types';

const cn = classNames.bind(styles);

type PropsType = {
  /** тип текста */
  text: string;
  /** тип размера текста */
  size: FontSizeType;
  /** цвет текста */
  color: FontColorType;
  /** флаг веса текста */
  isBold?: boolean;
  /** флаг регистра текста */
  isUpperCase?: boolean;
} & Props<any>;

export const Text: FC<PropsType> = ({
  text,
  size,
  color,
  isBold,
  isUpperCase,
}: PropsType) => (
  <span
    className={cn('Text', {
      [`Text--${size}`]: Boolean(size),
      [`Text--${color}`]: Boolean(color),
      'Text--bold': isBold,
      'Text--uppercase': isUpperCase,
    })}
  >
    {text}
  </span>
);
