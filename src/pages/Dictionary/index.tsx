import { RootState } from "src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { DictionaryItem } from "src/redux/slices/dictionarySlice";
import styles from "./dictionary.module.scss";
import { setWord } from "src/redux/slices/definitionSlice";
import { useNavigate } from "react-router-dom";

const Dictionary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dictionary = useSelector((state: RootState) => state.dictionary);
  const onClickItem = (word: string) => {
    dispatch(setWord(word));
    navigate("/");
  };
  return (
    <div className={styles.dictionary}>
      {dictionary.length ? (
        dictionary?.map((item: DictionaryItem) => (
          <div
            onClick={() => onClickItem(item?.word)}
            key={item.word}
            className={styles.dictionary__item}>
            {item.word}{" "}
            {item.transcription && (
              <span className={styles.description__transcription}>[{item.transcription}]</span>
            )}
            <span className={styles.dictionary__translated}>{item.translated}</span>
          </div>
        ))
      ) : (
        <h1 className={styles.dictionary__empty}>Вы не добавили ни одного слова в словарь!</h1>
      )}
    </div>
  );
};

export default Dictionary;
