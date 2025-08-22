import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import authReducer from './reducer/authReducer';
//import langReducer from './reducer/langReducer';

import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  auth: authReducer,
  //: langReducer
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
console.log(store)
export const persistor = persistStore(store)