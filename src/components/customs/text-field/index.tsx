import { styled, TextField, TextFieldProps } from "@mui/material"

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
    console.log(theme)
    return {
        "&.MuiInputLabel-root": {
            transform: "none",
            lineHeight: 1.2,
            position: "relative",
            marginBottom: theme.spacing
        }
    }
}) 

const  CustomTextField = (props : TextFieldProps ) => {
    const { size = 'small', InputLabelProps, variant= 'filled', ...rest } = props
    return <TextField size={size} variant={variant} InputLabelProps={{...InputLabelProps, shrink: true}} {...rest} />
}

export default CustomTextField