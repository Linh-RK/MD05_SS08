import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  data: [],
  error: null,
};

export const fetchAllUser = createAsyncThunk("user/fetchAllUser", async () => {
  const response = await axios.get("http://localhost:3000/users");

  return response.data;
});

export const removeUser = createAsyncThunk("user/removeUser", async () => {
  const response = await axios.delete(`http://localhost:3000/users/${id}`);

  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.status = "successfully";
      });
  },
});
export default userSlice.reducer;
