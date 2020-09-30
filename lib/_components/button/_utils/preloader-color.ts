import { ButtonVariant, DarkThemePresets } from '../types';

type ParamsType = {
  variant?: ButtonVariant;
  darkThemePreset?: DarkThemePresets;
};

export const preloaderColor = ({ variant, darkThemePreset }: ParamsType) => {
  if (variant) {
    if (variant === 'main' || variant === 'accent') {
      return 'white';
    }
    if (variant === 'interface') {
      return 'rich-grey';
    }
    if (variant === 'remove') {
      return 'red';
    }
  } else if (darkThemePreset) {
    if (darkThemePreset === 'neutral') {
      return 'grey';
    }
    if (darkThemePreset === 'negative') {
      return 'red';
    }
    if (darkThemePreset === 'positive') {
      return 'light-green';
    }
  }
  return 'grey';
};
