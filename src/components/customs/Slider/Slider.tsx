import {ChangeEvent, FC, HTMLAttributes, useState} from "react";

type SliderProps = {
    min?: number;
    max?: number;
    defaultValue?: number;
    darkMode?: boolean;
    fullWidth?: boolean;
    onChange?: (value: number) => void;
} & HTMLAttributes<HTMLElement>

const Slider: FC<SliderProps> = ({ min = 0, max = 100, defaultValue = 0,
      onChange = (value: number) => { }, darkMode = false, fullWidth = false, ...props }) => {

    const [value, setValue] = useState(defaultValue)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value))
        if (onChange) {
            onChange(Number(event.target.value))
        }
    }

    return (
        <input
            {...props}
            type="range"
            className={`${props.className ? props.className : ""} ${darkMode && "darkMode"} ${fullWidth && "fullWidth"}`}
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
        />
    )
}
export default Slider;