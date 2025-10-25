"use client"
import { FaSearch, FaCloudUploadAlt } from 'react-icons/fa';

interface Props {
    button?: "submit" | "button" | "reset" | undefined;
    color?: 'btn-primary' | 'btn-secondary' | 'btn-success' | 'btn-danger' | 'btn-warning' | 'btn-info' | 'btn-light' | 'btn-dark' | 'btn-link';
    icon?: any
    type?: 'search' | 'reset' | 'upload' | 'add' |undefined;
    title: string;
    onClick?: Function
    size?: "small" | "medium" | "default" | "great"
    disable?: boolean
    className?: string
}

export const InputButton = (props : Props) => {
    const {
        color = 'btn-primary',
        type,
        icon,
        button = 'button',
        title = '',
        onClick,
        size = 'default',
        disabled = false,
        className
    } = props;

    function handleRenderIcon() {
        switch (type) {
            case 'search':
                return <FaSearch />;
            case 'reset':
                return "";
            case 'upload':
                return <FaCloudUploadAlt />;
            default:
                return icon ? "<FontAwesomeIcon icon={icon} />" : '';
        }
    }
    return (
        <button className={`flex gap-2 bg-[var(--primary)] rounded-md p-2 text-white`} onClick={onClick}
                type={type}
                disabled={disabled}>
            {handleRenderIcon()} {title}
        </button>
    )
}