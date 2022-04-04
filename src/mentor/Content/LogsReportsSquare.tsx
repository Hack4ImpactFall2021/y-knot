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
            <h3 className="logs-reports-title"> 
                <img src={icon} />
               {title}
               {text}
            </h3>
        </div>
    );
}

export default LogsReportsSquare;