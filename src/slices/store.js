import { configureStore } from "@reduxjs/toolkit";
import productSlice from './state'

export default configureStore({
  reducer: {
    state: productSlice
  },
});
