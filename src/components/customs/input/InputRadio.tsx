import {Controller, UseFormReturn} from 'react-hook-form';
import {TypeValueRadio} from "@/types/common";
import {useEffect, useRef} from "react";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";

interface Props {
    name: string,
    defaultValue?: string;
    form: UseFormReturn<any, any>;
    data: TypeValueRadio[];
    column?:boolean;
    onChange?: Function;
}

export const InputRadio = (props: Props) => {
    const { form, name, defaultValue = '', data, column, onChange } = props
    const { control, formState } = form
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (onChange && !isFirstRun.current) onChange({key: name, value: form.getValues(name)});
        isFirstRun.current = false;
    }, [form.watch(name)]);
    return (
        <>
            <Controller
                render={control}
                name={name}
                defaultValue={defaultValue}
                render={({field}) => (
                    <RadioGroup row={!column} sx={{gap: '30px'}} {...field}>
                        {Array.from(data).map((item, index) => (
                            <FormControlLabel
                                key={index}
                                value={item.value}
                                label={item.label}
                                disabled={item?.isDisabled}
                                control={<Radio />}
                            />
                        ))}
                    </RadioGroup>
                )}
            />
        </>
    )
}