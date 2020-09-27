import React, { PropsWithChildren } from 'react';

import './index.scss';

export const BottomAligned = ({ children }: PropsWithChildren<{}>) => (
  <div className="Bottom-aligned">{children}</div>
);
