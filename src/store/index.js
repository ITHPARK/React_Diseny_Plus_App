import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer, persistStore} from 'redux-persist';



const rootReducer = combineReducers({
    user: userReducer
});

const persistConfig = {
    key: "root",
    storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);




//store 객체 반환
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }})
});


export const persistor = persistStore(store);
