import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import wishlistReducer from "./wishlistSlice";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";
import categoryReducer from "./categorySlice";
import reviewReducer from "./reviewSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    orders: orderReducer,
    categories: categoryReducer,
    reviews: reviewReducer,
  },
});

export default store;
