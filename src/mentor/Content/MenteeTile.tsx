type Props = {
}
const MenteeTile: React.FC<Props> = ({name}) => {
    return (
        <div className="mentee-tile">
            {name}
        </div>

    );
}
export default MenteeTile;