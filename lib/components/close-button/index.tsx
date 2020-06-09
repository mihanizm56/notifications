import React, { memo } from 'react';
import classnames from 'classnames/bind';
import styles from '../../styles/index.module.css';
import { CloseIcon } from './icons/close-icon';

const cn = classnames.bind(styles);

type PropsType = {
  handleClick: () => void;
};

export const CloseButton = memo(({ handleClick }: PropsType) => (
  <button type="button" className={cn('Close-button')} onClick={handleClick}>
    <CloseIcon />
  </button>
));
