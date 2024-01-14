import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setText, translateTexts } from "src/redux/slices/textSlice";
import DefinitionsItem from "./DefinitionsItem";
import { AppDispatch } from "src/redux/store";

export const Definitions = ({ mainDefinition }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onClickDefinition = (text: string) => {
    navigate("/text");
    dispatch(translateTexts(text));
    dispatch(setText(text));
  };
  return (
    <ol className={`description__definitions`}>
      {mainDefinition?.meanings?.map(
        (meaning: any) => 
          meaning?.definitions?.map((def: any) => (
            <DefinitionsItem
              key={def?.definition}
              onClickDefinition={(d) => onClickDefinition(d)}
              def={def?.definition}
            />
          ))
      )}
    </ol>
  );
};
