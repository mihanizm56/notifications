import React, { memo } from 'react';

export const iconColorsX = {
  error: '#f96666',
  default: '#4E4E53',
};

type PropsType = {
  fill?: keyof typeof iconColorsX;
};

export const BasicCircleXIcon = memo(({ fill = 'default' }: PropsType) => (
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
       6.02944 20 11 20ZM7.70711 15.7071L11 12.4142L14.2929 15.7071L15.7071 14.2929L12.4142 11L15.7071
        7.70711L14.2929 6.29289L11 9.58579L7.70711 6.29289L6.29289 7.70711L9.58579 11L6.29289 14.2929L7.70711
         15.7071Z"
      fill={iconColorsX[fill]}
      fillRule="evenodd"
    />
  </svg>
));
