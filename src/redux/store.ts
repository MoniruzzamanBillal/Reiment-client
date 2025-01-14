import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import recentProductReducer from "./features/recentProducts/recentproduct.slice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";

const persistConfig = {
  key: "auth",
  storage,
};
const recentProductConfig = {
  key: "recentProduct",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const persistRecentReducer = persistReducer(
  recentProductConfig,
  recentProductReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedReducer,
    recentProduct: persistRecentReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
