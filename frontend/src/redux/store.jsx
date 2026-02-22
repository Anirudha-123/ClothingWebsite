import cartReducer from "./ProductSlice.jsx";
import authReducer from "./authSlice.js";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
