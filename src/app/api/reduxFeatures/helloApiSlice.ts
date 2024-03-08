import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HelloAPi, HelloApiAnswer } from "../../models/helloapi";
import agent from "../agent";

interface HelloApiState {
  code?: number;
  msg?: string;
  cookie?: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  note: string | undefined;
}

const initialState: HelloApiState = {
  code: undefined,
  msg: "",
  cookie: "",
  status: "idle",
  error: null,
  note: "",
};

export const getAnswerHelloApiAsync = createAsyncThunk<HelloAPi, string>("helloApi/getAnswerHelloApiAsync", async (token, thunkAPI) => {
  try {
    const response = await agent.HelloApis.getHelloApiAnswer(token);
    console.log("helloApi response: ", response);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error });
  }
});

export const postHelloApiAnswerAsync = createAsyncThunk("helloApi/postHelloApiAnswerAsync", async (answer: HelloApiAnswer, { rejectWithValue }) => {
  try {
    const response = await agent.HelloApis.postHelloApiAnswer(answer);
    console.log("response answer: ==>", response);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const helloApiSlice = createSlice({
  name: "helloApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnswerHelloApiAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAnswerHelloApiAsync.fulfilled, (state, action: PayloadAction<HelloAPi>) => {
        state.code = action.payload.code;
        state.msg = action.payload.msg;
        state.cookie = action.payload.cookie;
        state.status = "succeeded";
      });
    builder
      .addCase(postHelloApiAnswerAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postHelloApiAnswerAsync.fulfilled, (state, action: PayloadAction<HelloApiAnswer>) => {
        state.note = action.payload.note;
      });
  },
});

export default helloApiSlice.reducer;
