import React from "react"
import { upperCase } from "src/utils/upperCase"
import { deleteSpaces } from "src/utils/deleteSpaces"
import { TextField, ThemeProvider, debounce } from "@mui/material"
import { InputStyles } from "./inputStyles"
import { useNavigate } from "react-router-dom"
import "src/style/style.scss"
import ScrollIcon from "src/components/icons/ScrollIcon"
import StartIcon from "src/components/icons/StartIcon"
import PauseIcon from "src/components/icons/PauseIcon"
import translate from "translate"
import { translateTexts } from "src/redux/slices/textSlice"
import { useDispatch, useSelector } from "react-redux"
import {
  setWord,
  setDefinition,
  translateText,
  setTranslated,
} from "src/redux/slices/definitionSlice"
import {
  DictionaryItem,
  setDictionaryWord,
} from "src/redux/slices/dictionarySlice"
import { RootState } from "src/redux/store"
import { AppDispatch } from "src/redux/store"
import { setText } from "src/redux/slices/textSlice"
import { DictionaryIcon } from "src/components/icons/DictionaryIcon"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const word = useSelector((state: RootState) => state.definition.word)
  const translated = useSelector(
    (state: RootState) => state.definition.translated
  )
  const [mainDefinition] = useSelector(
    (state: RootState) => state.definition.definition
  )
  const [sound, setSound] = React.useState<boolean>(true)
  async function getDefs(word: string) {
    const translatedWord = await translate(word, { from: "ru", to: "en" })
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${translatedWord}`
    )
    const json = await res.json()
    dispatch(setDefinition(json))
  }
  const audio = React.useRef<HTMLAudioElement>(null)
  const debouncedGetDefs = React.useCallback(
    debounce((word: string) => {
      getDefs(word)
      dispatch(translateText(word))
    }, 700),
    []
  )
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = deleteSpaces(e.target.value)
    dispatch(setWord(e.target.value))
    if (!e.target.value) {
      dispatch(setTranslated(""))
      dispatch(setDefinition([]))
    }
    debouncedGetDefs(e.target.value)
  }
  React.useEffect(() => {
    debouncedGetDefs(word)
  }, [word, debouncedGetDefs])
  const onClickDefinition = (text: string) => {
    navigate("/text")
    dispatch(translateTexts(text))
    dispatch(setText(text))
  }
  const onClickStart = () => {
    audio.current?.play()
    setSound(false)
    setTimeout(() => setSound(true), 1500)
  }
  const onClickPause = () => {
    audio.current?.pause()
    setSound(true)
  }
  const dictionaryItem = useSelector((state: RootState) =>
    state.dictionary.find(
      (item: DictionaryItem) => upperCase(item.word) === upperCase(word)
    )
  )
  const onClickDictionary = () => {
    if (!dictionaryItem) {
      dispatch(
        setDictionaryWord({
          word: word,
          translated: translated,
          transcription: mainDefinition?.phonetic,
        })
      )
    }
  }
  const inputTheme = InputStyles()
  return (
    <ThemeProvider theme={inputTheme}>
      <TextField
        inputProps={{ maxLength: 45 }}
        onChange={onChangeInput}
        multiline={true}
        rows={2}
        sx={{ marginTop: "70px", width: { xs: "80%", md: "30%" } }}
        id="home__search"
        label="Введите слово..."
        value={word}
        type="search"
      />
      <div className={word ? "description" : "description hidden"}>
        <div className="description__headline">
          <h2 className="description__word">
            {word && upperCase(word)}
            {mainDefinition?.phonetic && (
              <span className="description__transcription">
                [{mainDefinition?.phonetic}]
              </span>
            )}
          </h2>
          {sound ? (
            <StartIcon
              width={22}
              height={22}
              classNames={
                mainDefinition?.phonetics[0]?.audio
                  ? "description__icon"
                  : "description__icon disable"
              }
              onClickStart={onClickStart}
            />
          ) : (
            <PauseIcon
              width={22}
              height={22}
              classNames={
                mainDefinition?.phonetics[0]?.audio
                  ? "description__icon"
                  : "description__icon disable"
              }
              onClickPause={onClickPause}
            />
          )}
          {mainDefinition?.meanings && (
            <DictionaryIcon
              width={22}
              height={22}
              onClickDictionary={onClickDictionary}
            />
          )}
          <audio
            ref={audio}
            className="description__audio"
            src={mainDefinition?.phonetics[0]?.audio}
          ></audio>
        </div>
        <h2 className="description__translated">
          {mainDefinition && upperCase(translated)}
        </h2>
        <ol className="description__definitions">
          {mainDefinition?.meanings?.map(
            (meaning: any, i: number) =>
              meaning?.definitions?.map((def: any, j: number) => (
                <li
                  onClick={() => onClickDefinition(def.definition)}
                  key={i + j}
                  className="description__definition"
                >
                  {def.definition}
                </li>
              ))
          )}
        </ol>
        {mainDefinition?.meanings.reduce(
          (acc: number, cur: any) => acc + cur.definitions.length,
          0
        ) > 2 && <ScrollIcon width={32} height={32} />}
      </div>
    </ThemeProvider>
  )
}

export default Home
