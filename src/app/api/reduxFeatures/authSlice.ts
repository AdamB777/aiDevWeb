import { PayloadAction, SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../models/task";
import agent from "../agent";

interface AuthState {
  task?: string;
  code?: number;
  msg?: string;
  token?: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  task: "",
  code: undefined,
  msg: "", 
  token: "",
  status: "idle",
  error: null,
};

export const getTokenAsync = createAsyncThunk("auth/getTokenAsync", async (task: Task, { rejectWithValue }) => {
  try {
    const response = await agent.Tasks.getToken(task);
    console.log("token: ==>", response);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTokenAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTokenAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        state.task = action.payload.task;
        state.code = action.payload.code;
        state.msg = action.payload.msg;
        state.token = action.payload.token;
        state.status = "succeeded";
      });
  },
});

export default authSlice.reducer;
