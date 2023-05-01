import { ReactNode } from 'react';

type TitleProps = {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
};

export function Title({ children, size = 'medium' }: TitleProps) {
  function getFontSize() {
    if (size === 'small') return '1.5rem';
    if (size === 'large') return '3.0rem';

    return '2.25rem';
  }

  return <h1 style={{ fontSize: getFontSize() }}>{children}</h1>;
}
