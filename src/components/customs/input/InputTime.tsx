import {UseFormReturn, Controller} from "react-hook-form";
import React, {useEffect} from "react";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import cx from 'classnames';
import _ from 'lodash';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {vi} from "date-fns/locale/vi";
import { enUS  as en} from "date-fns/locale/en-US";
import {useSelector} from "react-redux";
import {langSelector} from "@/store/selector/langSelector";

interface TProps {
    label: string;
    name: string;
    defaultValue?: Date;
    form: UseFormReturn<any, any>;
    format?: string;
    fullWidth?: boolean
}
export const InputTime = (props: TProps) => {
    // ** Form
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
        form.setValue(name , defaultValue)
        return () => {
            form.setValue(name, undefined);
        }
    }, [])

    // ** State
    const [locale, setLocale] = React.useState<Date | null>(null);

    // ** Locale Languages
    const { dataLang, lang } = useSelector(langSelector)
    console.log(lang)

    // ** Handle Function
    const handleChangeLang = () => {
        if (lang === "vi")
            return vi;
        else
            return en;
    }

    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={handleChangeLang()}>
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
                                    helperText={_.get(formState?.errors, name)?.message}
                                    {...params}

                                />
                            )}
                        />
                    </LocalizationProvider>
                )}
            />
        </>
    )
}