import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./slices/ui.slice";
import { notificationsSlice } from "./slices/notification.slice";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        notification: notificationsSlice.reducer
    },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;