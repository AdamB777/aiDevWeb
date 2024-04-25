import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reduxFeatures/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import helloApiSlice from "./reduxFeatures/helloApiSlice";
import moderationSlice from "./reduxFeatures/moderationSlice";

export const store=configureStore({
    reducer:{
        auth:authSlice,
        helloApi:helloApiSlice,
        moderation:moderationSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;