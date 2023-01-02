import { configureStore } from "@reduxjs/toolkit";
import furnitureReducer from "./reducers/furnitureSlice";
import cartReducer from "./reducers/cartSlice";
export const store = configureStore({
  reducer: {
    furnitureItems: furnitureReducer,
    cartItems: cartReducer
  }
});
// State and Dispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
