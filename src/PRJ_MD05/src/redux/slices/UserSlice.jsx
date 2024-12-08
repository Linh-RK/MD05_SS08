import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfileAPI, updateProfileAPI } from "../api";

export const fetchProfile = createAsyncThunk("user/fetchProfile", async () => {
  const response = await fetchProfileAPI();
  return response.data;
});

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData) => {
    const response = await updateProfileAPI(userData);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default userSlice.reducer;
