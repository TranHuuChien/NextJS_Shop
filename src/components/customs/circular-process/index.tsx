import {Box, CircularProgress, CircularProgressProps, Typography} from "@mui/material";
import React, {useState } from "react";

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
    return (
        <Box sx={{ display: "inline-block", position: "relative" }}>
            <CircularProgress variant='determinate' {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Typography variant='caption' component='div' color='primary'>{`${Math.round(
                    props.value
                )}%`}</Typography>
            </Box>
        </Box>
    )
}

export default function CircularWithValueLabel() {
    const [progress, setProgress]= useState(10)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + 10))
        }, 200)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return <CircularProgressWithLabel value={progress}/>
}
