import React, {
  FC,
  useCallback,
  RefObject,
  ComponentType,
  FunctionComponent,
  useMemo,
  memo,
  SyntheticEvent,
} from 'react';
import classnames from 'classnames/bind';
import { FontSizeType } from '../text/types';
import styles from './index.scss';
import {
  ButtonVariant,
  ButtonSize,
  ButtonType,
  DarkThemePresets,
  ButtonClickEventType,
} from './types';

const cn = classnames.bind(styles);

type ButtonPropsType = {
  /** реф на иконочную кнопку */
  buttonRef?: RefObject<HTMLButtonElement>;
  /** отображение иконки в кнопке */
  children?: ComponentType<any> | FC<any> | FunctionComponent<any>;
  /** кнопка в темном интерфейсе */
  darkThemePreset?: DarkThemePresets;
  /** флаг рабочего состояния кнопки */
  disabled?: boolean;
  /** флаг устанавливающий width: 100% */
  fullWidth?: boolean;
  /** флаг отображения процесса загрузки внутри кнопки */
  isLoading?: boolean;
  /** флаг, устанавливающий текст в центр */
  isTextCenter?: boolean;
  /** коллбек-обработчик клика по кнопке */
  onClick?: (optionClickEvent: ButtonClickEventType) => void;
  /** размер кнопки */
  size?: ButtonSize;
  /** содержание текста */
  text?: string;
  /** выбор заголовка в кнопке */
  textSize?: FontSizeType;
  /** флаг регистра текста в кнопке */
  textUpperCase?: boolean;
  /** функциональный тип кнопки */
  type?: ButtonType;
  /** степень важности кнопки */
  variant?: ButtonVariant;
};

export const Button: FC<ButtonPropsType> = memo(
  ({
    text,
    type = 'button',
    size,
    onClick = () => false,
    disabled,
    variant,
    isLoading,
    children: Icon,
    fullWidth,
    darkThemePreset,
    isTextCenter,
  }: ButtonPropsType) => {
    const handleButtonClick = useCallback(
      (event: SyntheticEvent<HTMLButtonElement>) => {
        if (type !== 'submit') {
          event.stopPropagation();
        }
        if (!isLoading || variant !== 'success') {
          onClick({ event });
        }
      },
      [isLoading, onClick, type, variant],
    );

    const iconSingle = useMemo(
      () => Icon && !text && !(variant === 'adaptive'),
      [Icon, text, variant],
    );

    const buttonDarkVariant = useMemo(
      () => Boolean(darkThemePreset) && size === 'small' && !variant,
      [darkThemePreset, size, variant],
    );

    const iconNoVariantBig = useMemo(
      () =>
        Boolean(!text) &&
        !Boolean(variant) &&
        !Boolean(darkThemePreset) &&
        size === 'big',
      [text, variant, darkThemePreset, size],
    );

    const iconNoVariantSmall = useMemo(
      () =>
        Boolean(!text) &&
        !Boolean(variant) &&
        !Boolean(darkThemePreset) &&
        size === 'small',
      [text, variant, darkThemePreset, size],
    );

    const buttonIconElementSingle = useMemo(
      () =>
        (Boolean(!text) && Boolean(variant)) ||
        (Boolean(!text) && Boolean(darkThemePreset)),
      [text, variant, darkThemePreset],
    );

    const buttonIconElementSingleNoVariant = useMemo(
      () => Boolean(!text) && !Boolean(variant) && !Boolean(darkThemePreset),
      [text, variant, darkThemePreset],
    );

    const buttonIconSmall = useMemo(() => Icon && size === 'small' && text, [
      Icon,
      size,
      text,
    ]);

    const isVariantAdd = useMemo(() => variant === 'add', [variant]);
    const isBasicIcon = useMemo(() => !isVariantAdd, [isVariantAdd]);

    return (
      /* eslint-disable react/button-has-type */
      <button
        className={cn('Button', {
          [`Button--${variant}`]: Boolean(variant) && !darkThemePreset,
          [`Button--${size}`]: size && text,
          'Button--single': iconSingle,
          'Button--absolute': isLoading,
          'Button--full-width': fullWidth,
          'Button--align-center': isTextCenter,
          [`Button--${darkThemePreset}`]: buttonDarkVariant,
          'Button--add-small': size === 'small' && variant === 'add',
          'Button--remove-small': size === 'small' && variant === 'remove',
          'Button--main-small': size === 'small' && variant === 'main',
          'Button--accent-small': size === 'small' && variant === 'accent',
          'Button--interface-small':
            size === 'small' && variant === 'interface',
          'Button--disabled': disabled,
          'Button--icon-no-variant-big': iconNoVariantBig,
          'Button--icon-no-variant-small': iconNoVariantSmall,
        })}
        data-name="Button"
        disabled={disabled}
        onClick={handleButtonClick}
        type={type}
        /* eslint-enable react/button-has-type */
      >
        {Icon && (
          <span
            className={cn('Button__icon', {
              'Button__icon--single': buttonIconElementSingle,
              'Button__icon--single-no-variant': buttonIconElementSingleNoVariant,
              'Button__icon--small': buttonIconSmall,
              'Button__icon--single-adaptive': !text && variant === 'adaptive',
            })}
          >
            {isBasicIcon && <Icon />}
          </span>
        )}
      </button>
    );
  },
);
