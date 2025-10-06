import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth.api";
import { noteApi } from "./api/note.api";
import { withdrawalApi } from "./api/withdrawal.api";
import { dashboardApi } from "./api/dashboard.api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [noteApi.reducerPath]: noteApi.reducer,
    [withdrawalApi.reducerPath]: withdrawalApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      noteApi.middleware,
      withdrawalApi.middleware,
      dashboardApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
