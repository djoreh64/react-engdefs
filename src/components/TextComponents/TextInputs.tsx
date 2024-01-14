import React from 'react'
import { debounce } from 'lodash';
import styles from 'src/pages/Text/Text.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setText, setTranslatedText, translateTexts } from 'src/redux/slices/textSlice';
import { AppDispatch, RootState } from 'src/redux/store';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import { DeleteIcon } from '../Icons';
import { upperCase } from 'src/utils';

export const TextInputs = () => {
    const dispatch = useDispatch<AppDispatch>()
    const text = useSelector((state: RootState) => state.text.text);
    const translated = useSelector((state: RootState) => state.text.translated);
    const updateInputValue = React.useCallback(
      debounce((str: string) => {
        dispatch(translateTexts(str.replace(/\s{2,}/g, " ").trim()));
      }, 400),
      []
    );
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setText(e.target.value));
        if (e.target.value === "") {
          dispatch(setText(""));
          dispatch(setTranslatedText(""));
        }
        updateInputValue(e.target.value);
      };
      const onClickDelete = () => {
        dispatch(setText(""));
        dispatch(setTranslatedText(""));
      };
  return (
    <div className={styles.inputHolder}>
        <TextField
          InputProps={{
            sx: { borderRadius: { sm: "10px 0 0 10px", xs: "10px 10px 0 0" } },
            endAdornment: (
              <InputAdornment position="end">
                <CSSTransition
                  in={!!text}
                  timeout={300}
                  classNames="icon"
                  mountOnEnter
                  unmountOnExit>
                  {() => (
                    <IconButton onClick={onClickDelete}>
                      <DeleteIcon size={18} color={"#bbbbbb"} />
                    </IconButton>
                  )}
                </CSSTransition>
              </InputAdornment>
            ),
          }}
          spellCheck={false}
          multiline={true}
          onChange={onChangeInput}
          value={text && upperCase(text.replace(/\s{2,}/g, " "))}
          rows={5}
          sx={{
            width: {
              xs: "80%",
              md: "30%",
              textWrap: "wrap",
            },
          }}
          label="Введите текст..."
          type="search"
        />
        <TextField
          InputProps={{
            sx: { borderRadius: { sm: "0 10px 10px 0", xs: "0 0 10px 10px" } },
          }}
          spellCheck={false}
          multiline={true}
          rows={5}
          value={translated && upperCase(translated)}
          sx={{ width: { xs: "80%", md: "30%" } }}
          type="search"
        />
      </div>
  )
}
