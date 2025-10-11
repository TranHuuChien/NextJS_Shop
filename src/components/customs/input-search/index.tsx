'use client'
//** Mui Import
import { styled} from "@mui/material/styles";
import {InputBase} from "@mui/material";
//** React Import
import {useEffect, useState} from "react";
import {Icon} from "lucide-react";

interface TInputSearch {
    value: string,
    placeholder?: string,
    onChange: (value: string) => void
}

const Search = styled('div')(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    marginLeft: '0 !important',
    height: "38px",
    weight: "100%",
    //border: `1px solid ${theme.palette.customColors.borderColor}`,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
    }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    height: '100%',
    '& .MuiInputBase-input': {
        width: '100%',
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`
    }
}))

const InputSearch = (props: TInputSearch) => {
    //** Props
    const { value, placeholder = "Search", onChange } = props
    //** State
    const [search, setSearch] = useState("")
    useEffect(() => {
        setSearch(value)
    }, [value])
    return (
        <Search>
            <SearchIconWrapper>
                <Icon icon='material-symbols-light:search' />
            </SearchIconWrapper>
            <StyledInputBase value={value} placeholder={placeholder}
                inputProps={{ 'aria-label': 'search' }}
                // onKeyDown={(e:KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                //     if(e.key === "Enter" && (e as any).target.value) {
                //         onChange((e as any).target.value)
                //     }
                // }}
                onChange={e => {
                    setSearch(e.target.value)
                    if(!e.target.value) {
                       onChange(e.target.value)
                    }
                }}
            >

            </StyledInputBase>
        </Search>
    )
}
