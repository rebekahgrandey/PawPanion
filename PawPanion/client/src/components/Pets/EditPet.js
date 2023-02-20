import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPet, getPetById } from "../../modules/petManager";
import { Button } from "reactstrap";
import "./AddPet.css"

export const EditPetForm = () => {
    const [pet, setPet] = useState([])
    const [userInput, setUserInput] = useState({
        name: "",
        breed: "",
        birthdate: "",
        imageLocation: "",
        id: 0
    })
    const navigate = useNavigate()
    const { petId } = useParams() //how does this work?

    useEffect(() => {
        getPetById(petId).then(pet => setPet(pet));
    }, [])

    useEffect(() => {
        setUserInput({
            name: pet.name,
            breed: pet.breed,
            birthdate: pet.birthdate,
            imageLocation: pet.imageLocation,
            id: petId
        });
    }, [pet])

    const handleSaveButtonClick = (event) => {
        event.preventDefault(); //prevents page refresh (the default) after clicking save
        const updatedPet = {
            name: userInput.name,
            breed: userInput.breed,
            birthdate: userInput.birthdate,
            imageLocation: userInput.imageLocation,
            isMale: pet.isMale,
            isDog: pet.isDog,
            ownerId: pet.ownerId,
            id: parseInt(petId)
        };

        return editPet(updatedPet)
            .then(() => {
                navigate("/")
            })
    }

    const handleInputChange = (event) => {
        const copy = { ...userInput }
        copy[event.target.id] = event.target.value

        //if (userInput.imageLocation === /*broken link*/) {
        // userInput.imageLocation.copy[event.target.value] === null
        //}

        setUserInput(copy)
    }
    return (
        <>

            <form className="form-container mt-5">
                <div><a
                    style={{ textDecoration: "none" }} href="/">Return to HomePage</a></div>
                <h2 className="mt-2">Edit {pet.name}</h2>
                <label htmlFor="name">Name</label>
                <div><input
                    id="name"
                    className="field-input"
                    type="string"
                    value={userInput.name || ""}
                    onChange={handleInputChange}
                /></div>

                <label htmlFor="breed">Breed</label>
                <div><input
                    id="breed"
                    className="field-input"
                    type="string"
                    value={userInput.breed || ""}
                    onChange={handleInputChange}
                /></div>

                <label htmlFor="birthdate">Birthdate</label>
                <div><input
                    id="birthdate"
                    className="field-input"
                    type="datetime"
                    value={userInput.birthdate || ""}
                    onChange={handleInputChange}
                /></div>

                <label htmlFor="imageLocation">Profile Image URL</label>
                <div><input
                    id="imageLocation"
                    className="field-input"
                    type="text"
                    value={userInput.imageLocation || ""}
                    onChange={handleInputChange}
                /></div>

                <Button
                    className="mt-2"
                    style={{ borderRadius: "10px" }}
                    onClick={handleSaveButtonClick}>Save changes
                </Button>


            </form>

        </>
    );
}