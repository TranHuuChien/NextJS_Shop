import { en } from "@/lang/dist/lang.en";
import { vi } from "@/lang/dist/lang.vi";
import { kh } from "@/lang/lang.kh";
import { TypeLang } from "@/module";
import { createSlice } from "@reduxjs/toolkit";

type LangState = {
  lang: "en" | "vi";
};

const initialState = {
    isLang : true,
    lang : 'en',
    dataLang: (() => {
        const lang = localStorage.getItem('lang');
        switch(lang) {
            case 'vi': 
                return vi;
            case 'kh':
                return kh;
            default:
                return en;
        }
    })(),
}


export const langSlice = createSlice({
    name: "lang",
    initialState,
    reducers: {
        changeLang: (state, action: {payload: TypeLang}) => {
            state.lang = action.payload;
            localStorage.setItem('lang', action.payload);
            switch(action.payload) {
                case 'vi':
                    state.dataLang = vi
                case 'kh':
                //   state.dataLang = kh;
                //   break;
                default:
                    state.dataLang = kh;
                    break;
                }
        },
    }
})
//export const { changeLang } = langSlice.actions 
//export default langSlice.reducer