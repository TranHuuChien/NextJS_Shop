import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import { authSlice } from './reducer/authSlice';
//import langReducer from './reducer/langReducer';

import { combineReducers } from '@reduxjs/toolkit'
import {langSlice} from "@/store/reducer/langSlice";
import {loadingSlice} from "@/store/reducer/loadingSlice";
import {themeSlice} from "@/store/reducer/themeSlice";

const rootReducer = combineReducers({
    user: authSlice.reducer,
    lang: langSlice.reducer,
    loading: loadingSlice.reducer,
    theme: themeSlice.reducer
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({serializableCheck: false})
})
export const persistor = persistStore(store)