import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import translate from "translate"

export interface TextState {
  text: string
  translated: string
}

const initialState: TextState = {
  text: "",
  translated: "",
}

export const translateTexts = createAsyncThunk(
  "text/translateText",
  async (text: string) => {
    return text === (await translate(text, { from: "ru", to: "en" }))
      ? await translate(text, { from: "en", to: "ru" })
      : await translate(text, { from: "ru", to: "en" })
  }
)

export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
    setTranslatedText: (state, action: PayloadAction<string>) => {
      state.translated = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(translateTexts.fulfilled, (state, action) => {
      state.translated = action.payload
    })
  },
})

export const { setText, setTranslatedText } = textSlice.actions

export default textSlice.reducer
