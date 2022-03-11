type Props = {
}
/*
mentee -> list of mentee objects
{
    name

*/
const Mentee: React.FC<Props> = ({mentees}) => {


    return (
        <div className="mentee-list">
            {mentees.map((ment, idx) => 
                <MenteeTile 
                    key={idx}
                    name={ment.name}
                />)
            }
        </div>
    )
}
export default Mentee;