import { RootState } from "src/redux/store";
import { useSelector } from "react-redux";
import styles from "./dictionary.module.scss";
import DictionaryItem from "src/components/DictionaryComponents/DictionaryItem";

const Dictionary: React.FC = () => {
  const dictionary = useSelector((state: RootState) => state.dictionary.items);
  return (
    <div className={styles.dictionary}>
      {dictionary.length ? (
        dictionary.map((props) => <DictionaryItem key = {props.word} {...props} />)
      ) : (
        <h1 className={styles.dictionary__empty}>Вы не добавили ни одного слова в словарь!</h1>
      )}
    </div>
  );
};

export default Dictionary;
