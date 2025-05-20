import { FC, ButtonHTMLAttributes } from 'react';

import { SpinAnimation } from '@/components/PowerPointToPdfConverter/ConfirmationStep/SpinAnimation';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = ({ isLoading, variant, disabled, children, ...props }) => {
  return (
    <button
      className={`flex w-full items-center justify-center rounded-lg border shadow-sm disabled:cursor-not-allowed disabled:opacity-30 px-4 py-2.5 font-semibold  text-[14px]/[20px]
      ${
        variant === 'primary'
          ? 'border-blue-600 bg-blue-600 text-white'
          : 'border-gray-300 bg-transparent  text-gray-700'
      }`}
      {...props}
      disabled={disabled}
    >
      {isLoading ? <SpinAnimation /> : children}
    </button>
  );
};
