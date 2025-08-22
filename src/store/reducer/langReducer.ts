import { createSlice } from "@reduxjs/toolkit";

type LangState = {
  lang: "en" | "vi";
};

const initialState = {
    isLang : true,
    lang : 'en'
}


export const langSlice = createSlice({
    name: "langStore",
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload
        },
        
    }
})
export const { setLang } = langSlice.actions 
export default langSlice.reducer