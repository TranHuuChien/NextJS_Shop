import { themeSlice } from '@/store/reducer/themeSlice'
import { themeSelector } from '@/store/selector/themeSelector'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
    colorLogo: boolean
}



const TopbarLogo = (props: Props) => {
    const {colorLogo} = props
    const { enableClosedSidebar } = useSelector(themeSelector)
    const dispatch = useDispatch()
    const {setEnableClosedSidebar} = themeSlice.actions;
    const toggleEnableClosedSidebar = () => {
        dispatch(setEnableClosedSidebar(!enableClosedSidebar))
    }
    return (
        <div>TopbarLogo</div>
    )
}

export default TopbarLogo

