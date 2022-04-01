import "./LogsReportsSquare.css";
type Props = {
    title: string
    text: string
}
const LogsReportsSquare: React.FC<Props> = ({title, text}) => {
    return (
        <div className="logs-reports-square">
            <h3 className="logs-reports-title"> 
               {title}
               {text}
            </h3>
        </div>
    );
}
export default LogsReportsSquare;