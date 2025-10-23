import {ReactHookFormType, TypeValueCheckbox} from "@/types/common";
import {Controller, UseFormReturn} from 'react-hook-form';
import {Checkbox, FormControlLabel} from "@mui/material";


interface Props extends ReactHookFormType<any>{
    name: string;
    defaultValue?: string;
    form: UseFormReturn<any, any>;
    data: TypeValueCheckbox[];
    col?: boolean;
    onClick?: Function;
    color?: 'error' | 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning';
    size?: 'small' | 'medium';
}

interface PropsItem extends ReactHookFormType<any> {
    name: string;
    defaultValue?: string;
    form: UseFormReturn<any, any>;
    color?: 'error' | 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning';
    size?: 'small' | 'medium';
    disabled?: boolean;
    label: string;
    value: string | number;
}

export const InputCheckbox = (props: Props) => {
    const {name, data, col} = props;
    return (
        <>
            <div className={cx('flex', {'flex-col': col}, {'flex-row': !col}, 'ptb-10')}>
                {data.map((item, index) => (
                    <InputCheckboxItem
                        {...props}
                        key={index}
                        value={item.value}
                        label={item.label}
                        name={`${name}.${item.name || index}`}
                        disabled={item.isDisabled}
                    />
                ))}
            </div>
        </>
    )
}

const InputCheckboxItem = (itemProps: PropsItem) => {
    const {form, name, color, size, disabled, label, value} = itemProps;
    const {control, formState} = form;
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <FormControlLabel
                        control={
                            <>
                                <Checkbox {...field} color={color} disabled={disabled} size={size} value={value} />
                            </>
                        }
                        label={label}
                    />
                )}
            />
        </>
    )
}
