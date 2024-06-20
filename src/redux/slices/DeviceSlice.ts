import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosBase from "../../axios/axiosBase";

export const getDevices = createAsyncThunk("device/getDevices", async () => {
  const { data } = await axiosBase.get("/device");
  return data;
});

const initialState: {
  devices: any[];
  testName: string;
} = {
  devices: [],
  testName: "",
};
export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setTestName: (state, action) => {
      state.testName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDevices.fulfilled, (state, action) => {
      state.devices = action.payload;
    });
  },
});

export const deviceReducer = deviceSlice.reducer;
export const { setTestName } = deviceSlice.actions;
