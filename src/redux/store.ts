import { authSlice } from "@/store/reducer/authSlice";
import { langSlice } from "@/store/reducer/langSlice";
import { loadingSlice } from "@/store/reducer/loadingSlice";
import { themeSlice } from "@/store/reducer/themeSlice";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';

export const store = configureStore({
    reducer: {
        user: authSlice.reducer,
        lang: langSlice.reducer,
        loading: loadingSlice.reducer,
        theme: themeSlice.reducer
    }
})


export const persistor = persistStore(store)