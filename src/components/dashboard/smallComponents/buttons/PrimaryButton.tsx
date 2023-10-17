import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
    appearance?: 'primary' | 'light';
    buttonClickAction?: () => void;
}

export const PrimaryButton = ({
    icon,
    disabled,
    buttonClickAction,
    type,
    appearance = 'primary',
    children,
}: ButtonProps) => {
    return (
        <button
            type={type || 'button'}
            className={`btn btn-${appearance}`}
            onClick={buttonClickAction}
            disabled={disabled}
        >
            {icon && <i className={`ki-duotone ki-${icon} fs-2`}></i>}
            {children}
        </button>
    );
};
