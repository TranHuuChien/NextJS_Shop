import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {InputButton} from "@/components/customs/input/InputButton";


interface Props {
    titleContent: string;
    headerTitle: string;
    titleButtonLeft?: string;
    titleButtonRight?: string;
    open: boolean;
    onClose?: Function;
    onAccept?: Function;
    disabled?: boolean;
}

export const ModalConfirm = (props: Props) => {
    const {
        titleContent = "string",
        headerTitle = "string",
        titleButtonLeft = "Cancel",
        titleButtonRight = "Confirm",
        open,
        onClose,
        onAccept,
        disabled,
    } = props
    return (
        <div>
            <Dialog
                open={open}
                className='popup-confirm'
            >
                <DialogTitle id='alert-dialog-title'>{headerTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>{titleContent}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <InputButton
                        onClick={() => {
                            if (onClose) onClose();
                        }}
                        title={titleButtonLeft}
                        color='btn-secondary'
                        disabled={disabled}
                        size='small'
                    />
                    <InputButton
                        onClick={() => {
                            if (onAccept) onAccept();
                        }}
                        title={titleButtonRight}
                        color='btn-secondary'
                        disabled={disabled}
                        size='small'
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
}