import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrdersAPI, createOrderAPI } from "../api";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await fetchOrdersAPI();
  return response.data;
});

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData) => {
    const response = await createOrderAPI(orderData);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default orderSlice.reducer;
