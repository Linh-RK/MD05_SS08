import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addReviewAPI } from "../api";

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData) => {
    const response = await addReviewAPI(reviewData);
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reviewSlice.reducer;
