import { RootState } from "src/redux/store";
import { useSelector } from "react-redux";
import styles from "./dictionary.module.scss";
import DictionaryItem from "src/components/DictionaryComponents/DictionaryItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Dictionary: React.FC = () => {
  const dictionary = useSelector((state: RootState) => state.dictionary.items);
  return (<TransitionGroup className={styles.dictionary} component='div'>
      {dictionary.map((props) => <CSSTransition classNames="icon" key={props.word} timeout={300}><DictionaryItem key = {props.word} {...props} /></CSSTransition>)}
      {!dictionary.length && <h1 className={styles.dictionary__empty}>Вы не добавили ни одного слова в словарь!</h1>}
    </TransitionGroup>
  );
};

export default Dictionary;
