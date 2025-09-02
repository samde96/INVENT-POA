import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice.js";
import productReducer from "../redux/features/product/productSlice.js";
import filterReducer from "../redux/features/product/filterSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
  },
});
