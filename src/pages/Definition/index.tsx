import React from "react";
import { upperCase } from "src/utils/upperCase";
import { deleteSpaces } from "src/utils/deleteSpaces";
import { TextField, ThemeProvider, debounce } from "@mui/material";
import { InputStyles } from "./muiStyles";
import translate from "translate";
import "src/style/style.scss";
import ScrollIcon from "src/components/Header/icons/ScrollIcon";
import StartIcon from "src/components/Header/icons/StartIcon";
import PauseIcon from "src/components/Header/icons/PauseIcon";

const Home = () => {
  async function getTranslate(word: string) {
    return word === (await translate(word, { from: "ru", to: "en" }))
      ? await translate(word, { from: "en", to: "ru" })
      : await translate(word, { from: "ru", to: "en" });
  }
  const [word, setWord] = React.useState<string>("");
  const [translated, setTranslated] = React.useState<string>("");
  const [definition, setDefinition] = React.useState<any[]>([]);
  const [sound, setSound] = React.useState<boolean>(true);
  async function getDefs(word: string) {
    const transated = await translate(word, { from: "ru", to: "en" });
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${transated}`,
    );
    const json = await res.json();
    setDefinition(json);
  }
  const audio = React.useRef<HTMLAudioElement>(null);
  const debouncedGetDefs = React.useCallback(
    debounce((word: string) => {
      getDefs(word);
      getTranslate(word).then((translate) => setTranslated(translate));
    }, 700),
    [],
  );
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedGetDefs(deleteSpaces(e.target.value));
    setWord(deleteSpaces(e.target.value));
    e.target.value = deleteSpaces(e.target.value);
    if (!word) {
      setDefinition([]);
      setTranslated("");
    }
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
  const inputTheme = InputStyles();
  return (
    <ThemeProvider theme={inputTheme}>
      <main className="home">
        <TextField
          inputProps={{ maxLength: 45 }}
          onChange={onChangeInput}
          multiline={true}
          rows={2}
          sx={{ marginTop: "70px", width: { xs: "80%", md: "30%" } }}
          id="home__search"
          label="Введите слово..."
          type="search"
        />
        <div className={word ? "description" : "description hidden"}>
          <div className="description__headline">
            <h2 className="description__word">
              {word && upperCase(word)}
              {definition[0]?.phonetic && (
                <span className="description__transcription">
                  [{definition[0]?.phonetic}]
                </span>
              )}
            </h2>
            {sound ? (
              <StartIcon
                width={22}
                height={22}
                classNames={
                  definition[0]?.phonetics[0]?.audio
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
                  definition[0]?.phonetics[0]?.audio
                    ? "description__icon"
                    : "description__icon disable"
                }
                onClickPause={onClickPause}
              />
            )}
            <audio
              ref={audio}
              className="description__audio"
              src={definition[0]?.phonetics[0]?.audio}
            ></audio>
          </div>
          <h2 className="description__translated">
            {translated && upperCase(translated)}
          </h2>
          <ol className="description__definitions">
            {definition[0]?.meanings?.map(
              (meaning: any, i: number) =>
                meaning?.definitions?.map((def: any, j: number) => (
                  <li key={i + j} className="description__definition">
                    {def.definition}
                    <hr />
                  </li>
                )),
            )}
          </ol>
          {definition[0]?.meanings.reduce(
            (acc: number, cur: any) => acc + cur.definitions.length,
            0,
          ) > 2 && <ScrollIcon width={32} height={32} />}
        </div>
      </main>
    </ThemeProvider>
  );
};

export default Home;
