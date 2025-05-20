import {FC, ButtonHTMLAttributes} from "react";
import {SpinAnimation} from "@/components/ConfirmationStep/SpinAnimation";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant: "primary" | "secondary";
}

export const Button: FC<ButtonProps> = ({isLoading, variant, disabled, children, ...props}) => {
    return <button
        className={
        variant === "primary" ?
            `flex w-full items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-30` :
            `w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 font-semibold text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-30`}
        {...props}
        disabled={disabled}
    >
        {isLoading ? <SpinAnimation/> : children}
    </button>
}