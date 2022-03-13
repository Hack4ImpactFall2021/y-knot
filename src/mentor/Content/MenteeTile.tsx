import "./MenteeTile.css";
type Props = {
    name: string
}
const MenteeTile: React.FC<Props> = ({name}) => {
    return (
        <div className="mentee-tile">
            <h3 className="mentee-name" onClick={() => {}}> 
               {name}
            </h3>
        </div>
    );
}
export default MenteeTile;