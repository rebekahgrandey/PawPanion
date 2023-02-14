import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { getPetRecordsById } from "../../modules/recordManager";

export const RecordsByPetId = () => {
    const [records, setRecords] = useState([])
    const navigate = useNavigate()
    const { petId } = useParams()

    useEffect(() => {
        getPetRecordsById(petId).then(records => setRecords(records));
    }, [])

    return (
        <>
            <div><Link to={``}><h2>+ Add New Record</h2></Link></div>
            <Link to={`/`}><h3>return to Homepage</h3></Link>
            <h1>All Records</h1>
            {records.map((record) => {
                return <div key={record.id}>
                    <div>

                        <h3>Date: {record?.date}</h3>
                        <h3>Reason: {record?.recordType?.name}</h3>
                        <h3>Weight: {record?.weight} lbs</h3>
                        {record?.medication ? <h3>Medications: {record?.medication}</h3> : ""}
                        {record?.illness ? <h3>Illnesses: {record?.illness}</h3> : ""}
                        {record?.diet ? <h3>Dietary Notes: {record?.diet}</h3> : ""}
                        {record?.note ? <h3>Additional Info: {record?.note}</h3> : ""}
                        <h3>Seen by <img style={{ width: 40 }} src={record?.vet?.imageLocation} /> {record?.vet?.name}</h3>

                    </div>
                </div>
            })}

        </>
    )
}