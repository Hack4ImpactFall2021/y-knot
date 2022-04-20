import internal from "stream";
import "./MenteeInfoBox.css";
type Props = {
    gender: string;
    age: string;
    grade: string;
}
const MenteeInfoBox: React.FC<Props> = ({gender, age, grade}) => {
    return (
        <div className="mentee-info-box">
                <p className="mentee-info-text"> Gender: {gender} </p>
                <p className="mentee-info-text"> Age: {age} </p>
                <p className="mentee-info-text"> Grade: {grade} </p>
        </div>
    );
}

export default MenteeInfoBox;