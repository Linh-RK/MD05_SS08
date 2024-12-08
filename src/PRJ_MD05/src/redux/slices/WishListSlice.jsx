import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchWishlistAPI,
  addToWishlistAPI,
  removeFromWishlistAPI,
} from "../api";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const response = await fetchWishlistAPI();
    return response.data;
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId) => {
    const response = await addToWishlistAPI(productId);
    return response.data;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId) => {
    await removeFromWishlistAPI(productId);
    return productId;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;
