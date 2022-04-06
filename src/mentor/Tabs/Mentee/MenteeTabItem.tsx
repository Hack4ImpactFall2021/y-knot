import "./MenteeTabItem.css";
type Props = {
  name: string
  onClick: (name: string) => void
}
const MenteeTabItem: React.FC<Props> = ({ name, onClick }) => {
  return (
    <div className="mentee-tile" onClick={() => onClick(name)}>
      <h3 className="mentee-name"> 
        {name}
      </h3>
    </div>
  );
}
export default MenteeTabItem;