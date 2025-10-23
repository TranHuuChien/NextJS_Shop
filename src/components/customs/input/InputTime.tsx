import {UseFormReturn, Controller} from "react-hook-form";
import {useEffect} from "react";
import {DateTimePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import cx from 'classnames';
import _ from 'lodash';

interface TProps {
    label: string;
    name: string;
    defaultValue?: Date;
    form: UseFormReturn<any, any>;
    format?: string;
    fullWidth?: boolean
}
export const InputTime = (props: TProps) => {
    const {
        label,
        name,
        form,
        defaultValue = null,
        format = "dd/MM/yyyy HH:mm:ss",
        fullWidth = false
    } = props
    const { control, formState } = form

    useEffect(() => {
        form.setValue(name, defaultValue)
        return () => {
            form.setValue(name, undefined);
        }
    }, [])

    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <DateTimePicker
                        {...field}
                        label={label}
                        inputFormat={format}
                        renderInput={(params) => (
                            <TextField
                                className={cx({
                                    'mui-input-error': !!_.get(formState?.errors, name),
                                })}
                                fullWidth={fullWidth}
                                size='small'
                                // helperText={_.get(formState?.errors, name)?.message}
                                {...params}

                            />
                        )}
                    />
                )}
            />
        </>
    )
}