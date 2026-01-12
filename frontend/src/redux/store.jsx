import cartReducer from "./ProductSlice.jsx";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({

  reducer:{

     cart: cartReducer
  }
 
});
