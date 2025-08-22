import {createSlice} from '@reduxjs/toolkit';
import {TypeLang} from '../module';
// import {store} from '../redux';
import {en} from './lang.en';
import {kh} from './lang.kh';
import {vi} from './lang.vi';
export const langSlice = createSlice({
  name: 'lang',
  initialState: {
    lang: localStorage.getItem('lang') || 'kh',
    dataLang: (() => {
      const lang = localStorage.getItem('lang');
      switch (lang) {
        case 'vi':
          return vi;
        // case 'kh':
        //   return kh;
        default:
          return kh;
      }
    })(),
  },
  reducers: {
    changLang(state, action: {payload: TypeLang}) {
      state.lang = action.payload;
      localStorage.setItem('lang', action.payload);
      switch (action.payload) {  
        case 'vi':
          state.dataLang = vi;
          break;
        case 'kh':
          state.dataLang = kh;
          break;
        default:
          state.dataLang = kh;
          break;
      }
    },
  },
});
