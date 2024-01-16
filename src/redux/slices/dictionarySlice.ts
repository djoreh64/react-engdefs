import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import translate from "translate";
export interface DictionaryItem {
  word: string;
  translated: string;
  transcription: string;
}

interface DictionaryWord {
  word: string;
  transcription: string;
}

export const getDictionaryItem = createAsyncThunk("dictionary/getDictionaryItem", async (obj: DictionaryWord) => {
  const rusWord = await translate(obj.word, {
    from: "en",
    to: "ru",
  });
  const engWord = await translate(obj.word, {
    from: "ru",
    to: "en",
  });
  return {word: engWord.toLowerCase(), translated: rusWord.toLowerCase(), transcription: obj.transcription}
});

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
    setDictionaryItems (state, action: PayloadAction<DictionaryItem[]>) {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDictionaryItem.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export const { setDictionaryItems } = dictionarySlice.actions
export default dictionarySlice.reducer;
