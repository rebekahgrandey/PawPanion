import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { getPetRecordsById } from "../../modules/recordManager";
import { getCurrentUserByFirebaseId } from "../../modules/userManager";
import "../Pets/AddPet.css"

export const RecordsByPetId = () => {
    const [records, setRecords] = useState([])
    const [user, setUser] = useState([])
    const { petId } = useParams()
    const currentFirebaseUser = firebase.auth().currentUser.uid

    useEffect(() => {
        getPetRecordsById(petId).then(records => setRecords(records));
    }, [])

    useEffect(() => {
        getCurrentUserByFirebaseId(currentFirebaseUser).then(user => setUser(user));
    }, [])

    return (
        <>
            {user.isVet ? <div><Link to={`/record/add/${petId}`}><button className="mx-3 my-3 px-4 py-2" style={{ borderRadius: "20px", borderWidth: "0px" }}><h4>+ Add New Record</h4></button></Link></div> : ""}
            <Link to={`/`}><h5 className="mx-4" style={{ textDecoration: "none" }}>return to Homepage</h5></Link>
            <h1 className="mx-4">All Records</h1>
            {records.map((record) => {
                return <div key={record.id}>
                    <div className="form-container mt-3">

                        <h4 className="mt-3">Date: {record?.date}</h4>
                        <h4 className="mt-3">Reason: {record?.recordType?.name}</h4>
                        <h4 className="mt-3">Weight: {record?.weight} lbs</h4>
                        {record?.medication ? <h4 className="mt-3">Medications: {record?.medication}</h4> : ""}
                        {record?.illness ? <h4 className="mt-3">Illnesses: {record?.illness}</h4> : ""}
                        {record?.diet ? <h4 className="mt-3">Dietary Notes: {record?.diet}</h4> : ""}
                        {record?.note ? <h4 className="mt-3">Additional Info: {record?.note}</h4> : ""}
                        <h4 className="mt-3">Seen by <img style={{ width: 40, borderRadius: "20px" }} src={record?.vet?.imageLocation} /> {record?.vet?.name}</h4>
                        {user.isVet && record.vetId == user.id ? <div><Link to={`/record/delete/${record.id}`}><h4 className="mt-3">Delete Record</h4></Link></div> : ""}

                    </div>
                </div>
            })}

        </>
    )
}