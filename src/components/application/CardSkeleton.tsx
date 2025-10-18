"use client"

import {styled} from "@mui/material/styles";
import {Box, Card, Skeleton} from "@mui/material";


const StyledCard =styled(Card)(({theme}) => ({
    position: 'relative',
    boxShadow: theme.shadows[4],
    '.MuiCardMedia-root.MuiCardMedia-media': {
        objectFit: 'contain'
    }
}))

const CardSkeleton = () => {
    return (
        <StyledCard sx={{ width: '100%' }}>
            <Skeleton variant="rounded" width="100%" height={210} />

            <Box sx={{ padding: "8px 12px" }}>
                <Skeleton variant="text" width="100%" height={60} />
                <Skeleton variant="text" width="70%" height={40} />
                <Skeleton variant="text" width="50%" height={40} />
                <Skeleton variant="text" width="30%" height={40} />

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Skeleton variant="text" width="30%" height={40} />
                    <Skeleton variant="text" width="30px" height={40} />
                </Box>
                <Skeleton variant="rounded" width="100%" height={40} />
                <Skeleton variant="rounded" width="100%" height={40} sx={{mt: 4}} />
            </Box>
        </StyledCard>
    )
}

export default CardSkeleton