import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import mentorReducer from "./slices/mentorSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  mentor: mentorReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "mentor"], // Specify the reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
