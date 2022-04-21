import "./ProgressBar.css";
interface Props {
  fillAmount: number;
}
const ProgressBar: React.FC<Props> = ({ fillAmount }) => {
  return (
    <div className="training-progress-bar">
      <div 
        className="bar-filled"
        style={{ width: `${fillAmount}%`}}
      >
        <p>{fillAmount}%</p>
      </div>
    </div>
  );
}
export default ProgressBar;