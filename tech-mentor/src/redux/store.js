import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import mentorReducer from "./slices/mentorSlice";
import resultReducer from "./slices/resultSlice";
import dataReducer from "./slices/dataSlice";
import filterReducer from "./slices/filterSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { PersistGate } from "redux-persist/integration/react";

const rootReducer = combineReducers({
  auth: authReducer,
  mentor: mentorReducer,
  result: resultReducer,
  data: dataReducer,
  filters: filterReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "mentor", "result", "data", "filters"], // Specify the reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleware = [...getDefaultMiddleware(), thunk]; // Include Redux Thunk middleware

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
