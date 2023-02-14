import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecordById, deleteRecord } from "../../modules/recordManager";

export const DeleteRecord = () => {
    const { recordId } = useParams();
    const [record, setRecord] = useState({});
    //SET ONLY CURRENT VET TO BE ABLE TO DELETE

    const navigate = useNavigate();

    useEffect(() => {
        getRecordById(recordId).then((record) => setRecord(record));
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        deleteRecord(recordId)
            .catch((e) => alert(e.message))
            .then(() => navigate("/"));
    }

    return (
        <>
            <h2>Delete Record?</h2>
            <h3>This cannot be reversed.</h3>
            <button
                onClick={(event) => handleSaveButtonClick(event)}>
                Delete
            </button>
            <button onClick={() => navigate(`/`)}>
                Return to Homepage
            </button>
        </>
    )
}
