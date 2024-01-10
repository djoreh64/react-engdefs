import React from "react";
import "src/style/style.scss";
import { upperCase, deleteSpaces } from "src/utils";
import { IconButton, InputAdornment, TextField, ThemeProvider, debounce } from "@mui/material";
import { InputStyles } from "src/pages/Definition/inputStyles";
import { useNavigate } from "react-router-dom";
import { DictionaryIcon, DeleteIcon, StartIcon, PauseIcon } from "src/components/Icons";
import translate from "translate";
import { setText, translateTexts } from "src/redux/slices/textSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setWord,
  setDefinition,
  translateText,
  setTranslated,
} from "src/redux/slices/definitionSlice";
import { DictionaryItem, setDictionaryWord } from "src/redux/slices/dictionarySlice";
import { RootState, AppDispatch } from "src/redux/store";
import { CSSTransition } from "react-transition-group";

const Home = () => {
  const inputTheme = InputStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [sound, setSound] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const word = useSelector((state: RootState) => state.definition.word);
  const translated = useSelector((state: RootState) => state.definition.translated);
  const [mainDefinition] = useSelector((state: RootState) => state.definition.definition);
  const dictionaryItem = useSelector((state: RootState) =>
    state.dictionary.find((item: DictionaryItem) => upperCase(item.word) === upperCase(word))
  );
  const audio = React.useRef<HTMLAudioElement>(null);
  const getDefs = async (word: string) => {
    setIsLoading(true);
    try {
      const translatedWord = await translate(word, {
        from: "ru",
        to: "en",
      });
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${translatedWord}`);
      const json = await res.json();
      dispatch(setDefinition(json));
    } catch (err) {
      setDefinition([]);
    } finally {
      setIsLoading(false);
    }
  };
  const debouncedGetDefs = React.useCallback(
    debounce((word: string) => {
      getDefs(word);
      dispatch(translateText(word));
    }, 700),
    []
  );
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = deleteSpaces(e.target.value);
    dispatch(setWord(e.target.value));
    debouncedGetDefs(e.target.value);
    if (!e.target.value) {
      dispatch(setDefinition([]));
      dispatch(setTranslated(""));
    }
  };
  const onClickDefinition = (text: string) => {
    navigate("/text");
    dispatch(translateTexts(text));
    dispatch(setText(text));
  };
  const onClickStart = () => {
    audio.current?.play();
    setSound(false);
    setTimeout(() => setSound(true), 1500);
  };
  const onClickPause = () => {
    audio.current?.pause();
    setSound(true);
  };
  const onClickDictionary = () => {
    if (!dictionaryItem) {
      dispatch(
        setDictionaryWord({
          word: word,
          translated: translated,
          transcription: mainDefinition.phonetic,
        })
      );
    }
  };
  const onClickDelete = () => {
    dispatch(setWord(""));
    dispatch(setDefinition([]));
    dispatch(setTranslated(""));
  };
  return (
    <ThemeProvider theme={inputTheme}>
      <div className="container">
        <TextField
          spellCheck={false}
          inputProps={{ maxLength: 45 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <CSSTransition
                  in={!!word}
                  timeout={300}
                  classNames="icon"
                  mountOnEnter
                  unmountOnExit>
                  {() => (
                    <IconButton onClick={onClickDelete}>
                      <DeleteIcon width={18} height={18} color={"#bbbbbb"} />
                    </IconButton>
                  )}
                </CSSTransition>
              </InputAdornment>
            ),
          }}
          onChange={onChangeInput}
          multiline={true}
          rows={2}
          sx={{
            marginTop: "90px",
            width: { xs: "80%", md: "30%" },
          }}
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
                <span className="description__transcription">[{mainDefinition?.phonetic}]</span>
              )}
            </h2>
            {sound ? (
              <StartIcon
                width={22}
                height={22}
                color={"#5e5e5e"}
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
                color={"#5e5e5e"}
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
                color={"#5e5e5e"}
                onClickDictionary={onClickDictionary}
              />
            )}
            <audio
              ref={audio}
              className="description__audio"
              src={mainDefinition?.phonetics[0]?.audio}></audio>
          </div>
          <h2 className="description__translated">{translated && upperCase(translated)}</h2>
          {
            <CSSTransition
              in={!isLoading}
              timeout={1000}
              classNames="definitions"
              mountOnEnter
              unmountOnExit>
              {() => (
                <ol className={`description__definitions`}>
                  {mainDefinition?.meanings?.map(
                    (meaning: any, i: number) =>
                      meaning?.definitions?.map((def: any, j: number) => (
                        <li
                          onClick={() => onClickDefinition(def?.definition)}
                          key={i + j}
                          className="description__definition">
                          {def?.definition}
                        </li>
                      ))
                  )}
                </ol>
              )}
            </CSSTransition>
          }
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
