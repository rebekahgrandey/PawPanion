import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPetById, deletePet } from "../../modules/petManager";
import "./AddPet.css"

export const DeletePetPage = () => {
    const { petId } = useParams();
    const [pet, setPet] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getPetById(petId).then((pet) => setPet(pet));
    }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        deletePet(petId)
            .catch((e) => alert(e.message))
            .then(() => navigate("/"));
    }

    return (
        <div className="form-container mt-5">
            <div><a
                style={{ textDecoration: "none" }} href="/">Return to HomePage</a></div>
            <h2 className="mt-3">Delete {pet.name}?</h2>
            <div>All records of {pet.name} will also be permanently deleted. This cannot be reversed.</div>
            <img className="mt-4" style={{ width: "20rem", borderRadius: "60rem" }} src={pet.imageLocation} />
            <div className="mt-4">
                <button
                    className="submit_button px-2 py-1 mx-3"
                    style={{ borderRadius: "10px", width: "17rem" }}
                    onClick={(event) => handleSaveButtonClick(event)}>
                    Delete
                </button>
            </div>
        </div>
    )
}
