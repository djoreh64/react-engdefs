import React from "react";
import { upperCase } from "src/utils/upperCase";
import { deleteSpaces } from "src/utils/deleteSpaces";
import { TextField, createTheme, ThemeProvider, debounce } from "@mui/material";
import translate from "translate";
import "src/style/style.scss";

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
    e.target.value = deleteSpaces(e.target.value)
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
  const inputTheme = createTheme({
    typography: {
      fontFamily: `"Montserrat", sans-serif`,
      fontSize: 12,
    },
    palette: {
      primary: {
        main: "#000",
        dark: "#fff",
      },
    },
  });
  return (
    <ThemeProvider theme={inputTheme}>
      <main className="home">
        <TextField
          inputProps={{ maxLength: 45 }}
          onChange={onChangeInput}
          variant="filled"
          sx={{ width: "30%" }}
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
                </span>)}
            </h2>
            {sound ? (
              <svg
                onClick={onClickStart}
                className={
                  definition[0]?.phonetics[0]?.audio
                    ? "description__icon"
                    : "description__icon disable"
                }
                width="22px"
                height="22px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
                  fill="#000"
                />
              </svg>
            ) : (
              <svg
                onClick={onClickPause}
                className={
                  definition[0]?.phonetics[0]?.audio
                    ? "description__icon"
                    : "description__icon disable"
                }
                width="22px"
                height="22px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"
                  fill="#000"
                />
                <path
                  d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"
                  fill="#000"
                />
              </svg>
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
                meaning?.definitions?.map((def: any) => (
                  <li key={i} className="description__definition">
                    {def.definition}
                    <hr />
                  </li>
                )),
            )}
          </ol>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default Home;
