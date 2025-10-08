import { styled, TextField, TextFieldProps } from "@mui/material"
import { BiBorderRadius } from "react-icons/bi"

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
    console.log(theme)
    return {
        "&.MuiInputLabel-root": {
            transform: "none",
            lineHeight: 1.2,
            position: "relative",
            marginBottom: theme.spacing(1),
            fontSize: theme.typography.body2.fontSize
        },
        "& .MuiInputBase-root": {
            borderRadius: 8,
            backgroundColor: 'transparent !important',
            border: `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
            transition: theme.transitions.create(['border-color', 'box-shadow'], {
                duration: theme.transitions.duration.shorter
            }),
            "&:before, &:after": {
                display: 'none'
            },
            ".MuiInputBase-input": {
                padding: "12px 10px"
            }
        },

    }
})

const CustomTextField = (props: TextFieldProps) => {
    const { size = 'small', InputLabelProps, variant = 'filled', ...rest } = props
    return <TextField size={size} variant={variant} InputLabelProps={{ ...InputLabelProps, shrink: true }} {...rest} />
}

export default CustomTextField