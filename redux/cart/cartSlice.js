import { createSlice, current } from "@reduxjs/toolkit";

const initial_State = {
  itemsList: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initial_State,
  reducers: {
    addProductToCart: (state, action) => {
      let newItem = action.payload;
      if (state.itemsList.length === 0) {
        state.itemsList.push(newItem);
      } else {
        let matchedItem = state.itemsList.filter(
          (item) => item.productDetails.name === newItem.productDetails.name
        );
        if (matchedItem.length > 0) {
          matchedItem[0].quantity++;
        } else {
          state.itemsList.push(newItem);
        }
      }
    },
    removeAllInCart: (state, action) => {
      state.itemsList = [];
    },
    removeProductFromCart: (state, action) => {
      let currentState = current(state.itemsList);
      let itemToBeRemoved = currentState.findIndex((item) => {
        return item === action.payload;
      });
      let newState = currentState.toSpliced(itemToBeRemoved, 1);
      state.itemsList = newState;
    },
    updateItemQuantityFromCart: (state, action) => {
      let currentState = current(state.itemsList);
      let itemToUpdateIdx = currentState.findIndex((item) => {
        return item.productDetails.id === action.payload.productDetails.id;
      });
      let updatedItem = state.itemsList[itemToUpdateIdx];
      updatedItem.quantity = action.payload.quantity;
      state.itemsList[itemToUpdateIdx] = updatedItem;
    },
  },
});

export const {
  addProductToCart,
  removeAllInCart,
  removeProductFromCart,
  updateItemQuantityFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
