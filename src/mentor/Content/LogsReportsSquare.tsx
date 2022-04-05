import "./LogsReportsSquare.css";
type Props = {
    icon: string
    title: string
    text: string
}
const LogsReportsSquare: React.FC<Props> = ({icon, title, text}) => {
    return (
        <div className="logs-reports-square">
            <h3 className="logs-reports-title"> 
               {icon}
               {title}
               {text}
            </h3>
        </div>
    );
}
export default LogsReportsSquare;