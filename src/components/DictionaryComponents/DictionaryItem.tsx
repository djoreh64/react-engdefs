import styles from "src/pages/Dictionary/dictionary.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { setDictionaryItems } from "src/redux/slices/dictionarySlice";

type DictionaryItemProps = {
  word: string;
  transcription: string;
  translated: string;
};

const DictionaryItem = ({ word, transcription, translated }: DictionaryItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const dictionary = useSelector((state: RootState) => state.dictionary.items);
  const onClickItem = (word: string) => {
    dispatch(setDictionaryItems(dictionary.filter((item) => item.word !== word)))
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
