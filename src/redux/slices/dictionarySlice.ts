import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface DictionaryItem {
  word: string;
  translated: string;
  transcription: string;
}

const initialState: DictionaryItem[] = [];

export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    setDictionaryWord(state, action: PayloadAction<DictionaryItem>) {
      state.push(action.payload);
    },
  },
});

export const { setDictionaryWord } = dictionarySlice.actions;
export default dictionarySlice.reducer;
