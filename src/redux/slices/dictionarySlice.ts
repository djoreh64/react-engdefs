import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface DictionaryItem {
  word: string;
  translated: string;
  transcription: string;
}

type DictionaryState = {
  items: DictionaryItem[]
}

const initialState: DictionaryState  = {
  items: []
};

export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    setDictionaryWord(state, action: PayloadAction<DictionaryItem>) {
      state.items.push(action.payload);
    },
  },
});

export const { setDictionaryWord } = dictionarySlice.actions;
export default dictionarySlice.reducer;
