import { ReactElement } from 'react';

type Props = {
  borderColor?: string;
  border?: string;
  textColor: string;
  bgColor: string;
  type: 'button' | 'submit' | 'reset';
  text?: string;
  restClassName?: string;
  onClick?: (e) => void;
  children?: ReactElement;
};

const Button = ({
  borderColor,
  textColor,
  type,
  text,
  border,
  restClassName,
  onClick,
  children,
  bgColor,
}: Props) => {
  return (
    <button
      className={`text-sm p-2 px-8 rounded ${border} border-${borderColor} text-${textColor} bg-${bgColor} ${restClassName}`}
      type={type}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
