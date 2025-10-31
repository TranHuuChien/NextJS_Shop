import {FC, HTMLAttributes, ReactElement, useEffect, useRef} from "react";

type Props = {
    children: ReactElement;
    onClickOutside: () => void;
} & HTMLAttributes<HTMLElement>

export const OutsideClick : FC<Props> = ({ chidlren, onClickOutside, ...props}) => {
    //** Hook
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // ** Function
    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current?.contains(event.target as Node)) {
            onClickOutside();
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    })

    return (
        <div {...props} className={`outsideClick ${props.className ? props.className : ""}`} ref={wrapperRef}>
            {chidlren}
        </div>
    )
}