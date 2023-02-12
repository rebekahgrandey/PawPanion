import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPetById, deletePet } from "../../modules/petManager";

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
        <>
            <h2>Delete {pet.name}</h2>
            <h3>All records of {pet.name} will also be permanently deleted. This cannot be reversed.</h3>
            <img src={pet.imageLocation} />
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
