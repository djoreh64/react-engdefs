import React from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { CSSTransition } from "react-transition-group";
import { DeleteIcon } from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setDefinition,
  setIsLoading,
  setTranslated,
  setWord,
  translateText,
} from "src/redux/slices/definitionSlice";
import translate from "translate";
import { debounce } from "lodash";
import { deleteSpaces } from "src/utils";
import { AppDispatch, RootState } from "src/redux/store";

const DefinitionTextField: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const word = useSelector((state: RootState) => state.definition.word);
  const onClickDelete = () => {
    dispatch(setWord(""));
    dispatch(setDefinition([]));
    dispatch(setTranslated(""));
  };
  const getDefs = React.useCallback(
    async (word: string) => {
      dispatch(setIsLoading(true));
      try {
        const translatedWord = await translate(word, {
          from: "ru",
          to: "en",
        });
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${translatedWord}`
        );
        const json = await res.json();
        dispatch(setDefinition(json));
        dispatch(translateText(word));
      } catch (err) {
        dispatch(setDefinition([]));
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );
  const debouncedGetDefs = React.useCallback(
    debounce((word: string) => {
      getDefs(word);
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
  return (
    <TextField
      spellCheck={false}
      inputProps={{ maxLength: 45 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <CSSTransition in={word !== ''} timeout={300} classNames="icon" mountOnEnter unmountOnExit>
              {() => (
                <IconButton onClick={onClickDelete}>
                  <DeleteIcon size={18} color={"#bbbbbb"} />
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
  );
};

export default DefinitionTextField;
