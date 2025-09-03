import { UserProfile } from "@/module/AuthCommon";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  auth: null,
  data: {},
  status: 'init',
  roleCode: ''
} as UserProfile;

export const authSlice = createSlice({
    name: "authStore",
    initialState,
    reducers: {
        login: (state, action) => {
            const { data } = action.payload
            const { roleCode } = data
            state.data = data,
            state.status = 'sucsess',
            state.roleCode = roleCode
        },
        logout: (state) => {
            state.data = undefined;
            state.status = 'logout';
            state.roleCode = '';
        }
    }
})

export const { login, logout } = authSlice.actions
//export default authSlice.reducer
