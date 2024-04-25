import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Choice, ModerationAnswer, ModerationApi, ModerationGPT } from "../../models/moderation";
import agent from "../agent";

interface ModerationState {
  code?: number;
  msg?: string;
  input?: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  choice: Choice[];
  note?:string
}
const initialState: ModerationState = {
  code: undefined,
  msg: "",
  input: [],
  status: "idle",
  error: null,
  choice: [],
  note:"",
};

export const getQuestionsModerateAsync = createAsyncThunk<ModerationApi, string>("moderation/getQuestionsModerateAsync", async (token, thunkAPI) => {
  try {
    const response = await agent.Moderations.getModerationQuestions(token);
    console.log("moderation response: ", response);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error });
  }
});

export const postModerationGptAsync = createAsyncThunk("moderation/postModerationGptAsync", async (sentences: ModerationGPT, { rejectWithValue }) => {
  try {
    const response = await agent.Moderations.postModerationGPT(sentences);
    console.log("GPT moderation response: ", response);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const postModerationAnswerAsync = createAsyncThunk("moderation/postModerationAnswerAsync", async (answer: ModerationAnswer, { rejectWithValue }) => {
  try {
    const response = await agent.Moderations.postModerationAnswer(answer);
    console.log("response moderation answer: ==>", response);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const moderationSlice = createSlice({
  name: "moderation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionsModerateAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getQuestionsModerateAsync.fulfilled, (state, action: PayloadAction<ModerationApi>) => {
        state.code = action.payload.code;
        state.msg = action.payload.msg;
        state.input = action.payload.input;
        state.status = "succeeded";
      });
    builder
      .addCase(postModerationGptAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postModerationGptAsync.fulfilled, (state, action: PayloadAction<ModerationGPT>) => {
        state.choice = action.payload.choices || [];
      });
    builder
      .addCase(postModerationAnswerAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postModerationAnswerAsync.fulfilled, (state, action: PayloadAction<ModerationAnswer>) => {
        state.note = action.payload.note;
      });
  },
});
export default moderationSlice.reducer;
