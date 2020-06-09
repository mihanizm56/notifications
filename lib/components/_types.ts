import { MouseEvent } from 'react';
import { notificationIconStatus } from '@/constants';

export interface IMakeExternalActionParams {
  id: string;
  additionalActionType?: string;
  additionalPayload?: any;
}

export interface INotificationsModalsParams {
  text?: string;
  handleCloseClick: (event: MouseEvent<any>) => void;
  status: keyof typeof notificationIconStatus;
}

export type FontSizeType = 'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type FontColorType =
  | 'orange'
  | 'darkPurple'
  | 'purple'
  | 'superDuperLightPurple'
  | 'superDuperLightGrey'
  | 'red'
  | 'lightRed'
  | 'lightYellow'
  | 'lightBlue'
  | 'black'
  | 'white'
  | 'richGrey'
  | 'grey'
  | 'lightGrey'
  | 'successTextColor';
