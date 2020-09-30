import React, { memo } from 'react';

export const iconColors = {
  success: '#067b00',
  default: '#4E4E53',
};

type PropsType = {
  fill?: keyof typeof iconColors;
};

export const BasicCircleCheckedIcon = memo(
  ({ fill = 'default' }: PropsType) => (
    <svg
      fill="none"
      height="24"
      viewBox="-1 -1 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22
      11 22ZM11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706
       6.02944 20 11 20ZM14.2929 7.29289L9 12.5858L6.70711 10.2929L5.29289 11.7071L9 15.4142L15.7071
        8.70711L14.2929 7.29289Z"
        fill={iconColors[fill]}
        fillRule="evenodd"
      />
    </svg>
  ),
);
