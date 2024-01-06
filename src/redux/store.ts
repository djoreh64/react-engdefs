import { configureStore } from "@reduxjs/toolkit";
import definition from "src/redux/slices/definitionSlice";
import text from "./slices/textSlice";

export const store = configureStore({
  reducer: {
    definition,
    text,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
