import {styled} from "@mui/material/styles";
import {Modal, ModalProps, Box } from "@mui/material";
import {BoxProps} from "@mui/material/Box";
import CircularWithValueLabel from "@/components/customs/circular-process";

const CustomModal = styled(Modal)<ModalProps>(({theme}) => ({
    '&.MuiModal-root': {
        width: '100%',
        height: '100%',
        zIndex: 2000,
        '.MuiModal-backdrop': {
            //backgroundColor: `rgba(${theme.palette.customColors.main}, 0.4)`
        }
    }
}))

const Spinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
    <CustomModal open={true}>
        <Box sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            ...sx
        }}>
            <CircularWithValueLabel />
        </Box>
    </CustomModal>
}
export default Spinner;