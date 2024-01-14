import { RootState } from "../../redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DictionaryItem, setDictionaryWord } from "src/redux/slices/dictionarySlice";
import { AppDispatch } from "src/redux/store";
import { upperCase } from "src/utils";
import { DictionaryIcon, PauseIcon, StartIcon } from "../Icons";
import { Definitions } from "./Definitions";
import { CSSTransition } from "react-transition-group";

const DefinitionDescription = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [sound, setSound] = React.useState<boolean>(true);
  const isLoading = useSelector((state: RootState) => state.definition.isLoading);
  const translated = useSelector((state: RootState) => state.definition.translated);
  const [mainDefinition] = useSelector((state: RootState) => state.definition.definition);
  const word = useSelector((state: RootState) => state.definition.word);
  const dictionaryItem = useSelector((state: RootState) =>
    state.dictionary.items.find((item: DictionaryItem) => upperCase(item.word) === upperCase(word))
  );
  const audio = React.useRef<HTMLAudioElement>(null);
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
          word: '',
          translated: '',
          transcription: ''
        })
      );
    }
  };
  return (
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
            size = {22}
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
            size = {22}
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
            size = {22}
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
          {() => <Definitions mainDefinition={mainDefinition} />}
        </CSSTransition>
      }
    </div>
  );
};

export default DefinitionDescription;
