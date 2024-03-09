import "./MenteeTabItem.css";
type Props = {
  name: string;
  onClick: (name: string) => void;
  onUnassign: (name: string) => void;
};
const MenteeTabItem: React.FC<Props> = ({ name, onClick, onUnassign }) => {
  return (
    <div className="mentee-tile">
      <div className="mentee-tile-clickbox" onClick={() => onClick(name)}>
        <h3 className="mentee-name">{name}</h3>
      </div>
      <div className="unassign-button" onClick={() => onUnassign(name)}>
        Remove
      </div>
    </div>
  );
};
export default MenteeTabItem;
