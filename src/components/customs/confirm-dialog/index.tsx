'use client'
import {Box, Button, Dialog, DialogActions, DialogContentText, DialogTitle, Typography, useTheme} from "@mui/material";
import {styled} from "@mui/material/styles";
import IconifyIcon from "../icons/index";
import {memo} from "react";

interface TConfirmDialog {
    open: boolean,
    title: string,
    description: string,
    handleClose: () => void,
    handleConfirm: () => void,
    handleCancel: () => void,
}

const CustomStyleContent = styled(DialogContentText)(() => {
    padding: '10px 20px'
})

const StyledDialog = styled(Dialog)(() => ({
    ".MuiPaper-root.MuiPaper-elevation": {
        width: "400px"
    }
}))

const ConfirmationDialog = (props: TConfirmDialog) => {
    const { open, title, description, handleClose, handleConfirm, handleCancel } = props
    const theme = useTheme()
    return (
        <StyledDialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <IconifyIcon icon='ep:warning' fontSize={80} color={theme.palette.warning.main} />
            </Box>
            <DialogTitle>
                <Typography variant='h4' sx={{ fontWeight: 600 }}>
                    {title}
                </Typography>
            </DialogTitle>

            <CustomStyleContent>
                <DialogContentText sx={{ textAlign: 'center', marginBottom: '20px'}}>{description}</DialogContentText>
            </CustomStyleContent>

            <DialogActions>
                <Button color='error' onClick={handleConfirm}>Cancel</Button>
                <Button color='contained' onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
        </StyledDialog>
    )
}
export default memo(ConfirmationDialog)
