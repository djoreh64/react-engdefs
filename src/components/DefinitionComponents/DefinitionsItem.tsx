type DefinitionsItemProps = {
  onClickDefinition: (def: string) => void;
  def: string;
};

const DefinitionsItem = ({ onClickDefinition, def }: DefinitionsItemProps) => {
  return (
    <li onClick={() => onClickDefinition(def)} className="description__definition">
      <button className="description__button"> {def}</button>
    </li>
  );
};

export default DefinitionsItem;
