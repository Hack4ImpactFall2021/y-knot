import React from 'react';
import "./LogsReportsSquare.css";

type Props = {
    icon: string
    title: string
    text: string
    color: string
}
const LogsReportsSquare: React.FC<Props> = ({icon, title, text, color}) => {
    return (
        <div style={{border: `4px solid ${color}`}} className="logs-reports-square">
          <div className="icon-title">
            <img style={{margin:"25px"}} src={icon} />
            <h1 className="logs-reports-title"> {title} </h1>
          </div>
          <p className="logs-reports-text"> {text} </p>
        </div>
    );
}

export default LogsReportsSquare;