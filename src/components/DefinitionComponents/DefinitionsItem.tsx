type DefinitionsItemProps = {
  onClickDefinition: (def: string) => void;
  def: string;
};

const DefinitionsItem = ({ onClickDefinition, def }: DefinitionsItemProps) => {
  return (
    <li onClick={() => onClickDefinition(def)} className="description__definition">
      {def}
    </li>
  );
};

export default DefinitionsItem;
