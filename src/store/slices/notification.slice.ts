import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationsState {
    unreadCount: number;
    notifications: {
        id: string;
        message: string;
        read: boolean;
        createdAt: string;
    }[];
}

const initialState: NotificationsState = {
    unreadCount: 0,
    notifications: [],
};

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        // add new notification
        addNotification: (
            state,
            action: PayloadAction<{ id: string; message: string; createdAt: string }>
        ) => {
            state.notifications.unshift({
                ...action.payload,
                read: false,
            });
            state.unreadCount += 1;
        },

        // mark one as read
        markAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(
                (n) => n.id === action.payload
            );
            if (notification && !notification.read) {
                notification.read = true;
                state.unreadCount -= 1;
            }
        },

        // mark all as read
        markAllAsRead: (state) => {
            state.notifications.forEach((n) => (n.read = true));
            state.unreadCount = 0;
        },

        // clear all
        clearNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
        },
    },
});

export const {
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
} = notificationsSlice.actions;