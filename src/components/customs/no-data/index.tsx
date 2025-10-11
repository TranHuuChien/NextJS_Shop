'use client'
//** Next
import Image from 'next/image'

//** Mui Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material";

//** Image Import
import Nodata from '../../../public/no-data.svg'

type TProps = {
    widthImage?: string,
    heighImage?: string,
    textNoData?: string
}

const NoData = (props: TProps) => {
    //** Props
    const { widthImage= "100px", heightImage="100px", textNoData="No Data" } = this.props

    return (
        <Box sx={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
            <Image src={Nodata} alt='No Data' width={0} height={0}
                   style={{
                        height: heightImage,
                        width: widthImage,
                        objectFit: 'cover'
                    }}>

            </Image>

            <Typography sx={{ whiteSpace: 'nowrap', mt: 2 }}>{textNoData}</Typography>
        </Box>
    )
}

export default NoData;