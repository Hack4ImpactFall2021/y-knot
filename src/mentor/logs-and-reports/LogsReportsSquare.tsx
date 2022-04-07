import "./LogsReportsSquare.css";
type Props = {
    icon: string
    title: string
    text: string
    color: string
}
const LogsReportsSquare: React.FC<Props> = ({icon, title, text, color}) => {
    return (
        <div style={{border: `2px solid ${color}`}} className="logs-reports-square">
                <img style={{margin:"25px", float:"left"}} src={icon} />
                <h3 className="logs-reports-title"> {title} </h3>
                <p className="logs-reports-text"> {text} </p>
        </div>
    );
}

export default LogsReportsSquare;