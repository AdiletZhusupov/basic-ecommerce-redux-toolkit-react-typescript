import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartFurniture, IFurnitureItem } from "../../types/types";

interface IInitialState {
  cartItems: ICartFurniture[];
}

const initialState: IInitialState = {
  cartItems: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addFurnitureItem: (state, action: PayloadAction<IFurnitureItem>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.productInfo.id === action.payload.id
      );

      if (!item) {
        state.cartItems.push({
          productInfo: { ...action.payload },
          quantity: 1
        });
      } else {
        const index = state.cartItems.findIndex(
          (cartItem) => cartItem.productInfo.id === item.productInfo.id
        );
        state.cartItems.splice(index, 1, {
          productInfo: { ...action.payload },
          quantity: item.quantity! + 1
        });
      }
    },
    removeFurnitureItem: (state, action: PayloadAction<IFurnitureItem>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.productInfo.id === action.payload.id
      );

      if (item?.quantity! > 1) {
        const index = state.cartItems.findIndex(
          (cartItem) => cartItem.productInfo.id === item?.productInfo.id
        );
        state.cartItems.splice(index, 1, {
          productInfo: { ...action.payload },
          quantity: item?.quantity! - 1
        });
      } else {
        state.cartItems = state.cartItems.filter((cartItem) => {
          return cartItem.productInfo.id !== item?.productInfo.id;
        });
      }
    }
  }
});

export default cartSlice.reducer;
export const { addFurnitureItem, removeFurnitureItem } = cartSlice.actions;
