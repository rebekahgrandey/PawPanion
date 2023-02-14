import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { getCurrentUserByFirebaseId } from "../../modules/userManager";
import { addRecord } from "../../modules/recordManager";
import { getPetById } from "../../modules/petManager";

export const AddRecordForm = () => {
    const currentFirebaseUser = firebase.auth().currentUser.uid
    // const [recordTypes, setRecordTypes] = useState([]);
    const [vet, setVet] = useState([]);
    const [pet, setPet] = useState([]);
    const [vetInput, setVetInput] = useState({
        recordTypeId: 0,
        date: "",
        weight: 0,
        medication: "",
        illness: "",
        diet: "",
        note: ""
    });
    const navigate = useNavigate();
    const { petId } = useParams();

    useEffect(() => {
        getPetById(petId).then(pet => setPet(pet));
    }, []);

    useEffect(() => {
        getCurrentUserByFirebaseId(currentFirebaseUser).then(vet => setVet(vet));
    }, []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        const newRecord = {
            recordTypeId: vetInput.recordTypeId,
            date: vetInput.date,
            weight: vetInput.weight,
            medication: vetInput.medication,
            illness: vetInput.illness,
            diet: vetInput.diet,
            note: vetInput.note,
            vetId: vet.id,
            petId: pet.id
        };
        if (
            vetInput.recordTypeId &&
            vetInput.date
        ) {
            return addRecord(newRecord)
                .then(() => navigate("/"));
        } else {
            alert("Please complete the form");
        }
    };

    const handleInputChange = (event) => {
        const copy = { ...vetInput };
        copy[event.target.name] = event.target.value

        setVetInput(copy);
    };

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title"><img style={{ width: 40 }} src={pet.imageLocation} /> {pet.name} | Add Record</h2>
            <fieldset>
                <div className="form-group">

                    <label htmlFor="recordTypeId">Record Type: </label>
                    <select
                        required
                        id="recordTypeId"
                        autoFocus
                        name="recordTypeId"
                        className="form-control"
                        value={vetInput.recordTypeId}
                        onChange={handleInputChange}
                    >
                        {/* {
                            recordTypes.map((recordType) => {
                                return <option key={recordType.id} value={recordType.id}>
                                    {recordType.name}</option>
                            }
                            )
                        } */}

                        <option>Choose a Record Type</option>
                        <option value="1">Routine Checkup</option>
                        <option value="2">Vaccination</option>
                        <option value="3">Surgery</option>
                        <option value="4">Treatment</option>
                        <option value="5">Other</option>

                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date & Time of Visit: </label>
                    <input
                        required
                        autoFocus
                        name="date"
                        type="date"
                        className="form-control"
                        value={vetInput.date}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="weight">Weight{`(lbs)`}: </label>
                    <input
                        autoFocus
                        name="weight"
                        type="number"
                        min=".1"
                        max="1000"
                        step=".1"
                        className="form-control"
                        value={vetInput.weight}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="medication">Current Medications:</label>
                    <input
                        autoFocus
                        name="medication"
                        type="text"
                        className="form-control"
                        value={vetInput.medication}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="illness">Illnesses:</label>
                    <input
                        autoFocus
                        name="illness"
                        type="text"
                        className="form-control"
                        value={vetInput.illness}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="note">Additional Notes:</label>
                    <input
                        autoFocus
                        name="note"
                        type="text"
                        className="form-control"
                        value={vetInput.note}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="diet">Special dietary needs: </label>
                    <input
                        autoFocus
                        name="diet"
                        type="text"
                        className="form-control"
                        value={vetInput.diet}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="submit_button">Add Record
            </button>
        </form>
    );
};