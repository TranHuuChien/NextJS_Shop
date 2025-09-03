import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isShow: false,
        isDisable: false
    },
    reducers: {
        show(state) {
            if(state.isDisable) {
                state.isShow = false;
            } else {
                state.isDisable =false
            }
        },
        hide(state) {
            state.isShow = false;
        },
        setDisableTrue(state) {
            state.isDisable = true;
        },
        setDisableFalse(state) {
            state.isDisable = false
        }
    }
})
