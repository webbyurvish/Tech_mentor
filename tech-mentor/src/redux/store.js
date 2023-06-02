import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import mentorReducer from "./slices/mentorSlice";
import resultReducer from "./slices/resultSlice";
import dataReducer from "./slices/dataSlice";
import filterReducer from "./slices/filterSlice";
import mentorsReducer from "./slices/mentorsSlice";
import accountReducer from "./slices/accountSlice";
import likeRatingReducer from "./slices/likeratingSlice";

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

const rootReducer = combineReducers({
  auth: authReducer,
  mentor: mentorReducer,
  mentors: mentorsReducer,
  result: resultReducer,
  data: dataReducer,
  filters: filterReducer,
  account: accountReducer,
  likeRating: likeRatingReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "mentor",
    "result",
    "data",
    "filters",
    "mentors",
    "likeRating",
  ], // Specify the reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
