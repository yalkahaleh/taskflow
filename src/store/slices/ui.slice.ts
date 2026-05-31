import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    sidebarOpen: boolean;
}

const initialState: UIState = {
    sidebarOpen: true,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
    },
});

export const { toggleSidebar, setSidebarOpen } = uiSlice.actions;