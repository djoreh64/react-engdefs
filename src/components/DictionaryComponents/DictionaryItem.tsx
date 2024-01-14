import styles from "src/pages/Dictionary/dictionary.module.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "src/redux/store";
import { setWord } from "src/redux/slices/definitionSlice";

type DictionaryItemProps = {
  word: string;
  transcription: string;
  translated: string;
};

const DictionaryItem = ({ word, transcription, translated }: DictionaryItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onClickItem = (word: string) => {
    dispatch(setWord(word));
    navigate("/");
  };
  return (
    <div onClick={() => onClickItem(word)} key={word} className={styles.dictionary__item}>
      <span>{word}</span>
      {transcription && (
        <span className={styles.description__transcription}>[{transcription}]</span>
      )}
      <span className={styles.dictionary__translated}>{translated}</span>
    </div>
  );
};

export default DictionaryItem;
