import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'danger';
  children: ReactNode;
};

export function Button({
  variant = 'default',
  children,
  ...props
}: ButtonProps) {
  function getVariantStyle(): CSSProperties {
    if (variant === 'danger') {
      return {
        backgroundColor: 'red',
        color: 'white',
      };
    }

    return {
      backgroundColor: 'blue',
      color: 'black',
    };
  }

  return (
    <button style={{ ...getVariantStyle() }} {...props}>
      {children}
    </button>
  );
}
