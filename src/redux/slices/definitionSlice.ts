import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import translate from "translate";

export interface DefinitionState {
  word: string;
  translated: string;
  definition: any[];
  isLoading: boolean
}

const initialState: DefinitionState = {
  word: "",
  translated: "",
  definition: [],
  isLoading: false
};

export const translateText = createAsyncThunk("definition/translateText", async (text: string) => {
  return text === (await translate(text, { from: "ru", to: "en" }))
    ? await translate(text, { from: "en", to: "ru" })
    : await translate(text, { from: "ru", to: "en" });
});

export const definitionSlice = createSlice({
  name: "definition",
  initialState,
  reducers: {
    setWord: (state, action: PayloadAction<string>) => {
      state.word = action.payload;
    },
    setTranslated: (state, action: PayloadAction<string>) => {
      state.translated = action.payload;
    },
    setDefinition: (state, action: PayloadAction<any[]>) => {
      if (Array.isArray(action.payload)) {
        state.definition = action.payload;
      } else {
        state.definition = [];
      }
    }, 
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(translateText.fulfilled, (state, action) => {
      state.translated = action.payload;
    });
  },
});

export const { setWord, setTranslated, setDefinition, setIsLoading } = definitionSlice.actions;

export default definitionSlice.reducer;
