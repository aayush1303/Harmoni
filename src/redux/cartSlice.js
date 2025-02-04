import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cart")) || {}, // Load from localStorage
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            if (state.cartItems[product.id]) {
                state.cartItems[product.id].quantity += 1;
            } else {
                state.cartItems[product.id] = { ...product, quantity: 1 };
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems)); // Sync with localStorage
        },
        incrementQty: (state, action) => {
            const productId = action.payload;
            if (state.cartItems[productId]) {
                state.cartItems[productId].quantity += 1;
                localStorage.setItem("cart", JSON.stringify(state.cartItems));
            }
        },
        decrementQty: (state, action) => {
            const productId = action.payload;
            if (state.cartItems[productId]) {
                if (state.cartItems[productId].quantity > 1) {
                    state.cartItems[productId].quantity -= 1;
                } else {
                    delete state.cartItems[productId];
                }
                localStorage.setItem("cart", JSON.stringify(state.cartItems));
            }
        },
    },
});

export const { addToCart, incrementQty, decrementQty, } = cartSlice.actions;
export default cartSlice.reducer;
