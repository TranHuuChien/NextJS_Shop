
interface TConfirmDialog {
    open: boolean,
    title: string,
    description: string,
    handleClose: () => void,
    handleConfirm: () => void,
    handleCancel: () => void,
}

