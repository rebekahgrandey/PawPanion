import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { getCurrentUserByFirebaseId } from "../../modules/userManager";
import { addPet } from "../../modules/petManager";

export const AddPetForm = () => {
    const currentFirebaseUser = firebase.auth().currentUser.uid
    const [user, setUser] = useState([])
    const [userInput, setUserInput] = useState({
        name: "",
        breed: "",
        isMale: false,
        birthdate: "",
        isDog: false,
        imageLocation: ""
    });
    const navigate = useNavigate();

    const getUser = () => {
        getCurrentUserByFirebaseId(currentFirebaseUser).then(user => setUser(user));
    }

    useEffect(() => {
        getUser();
    }, []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault(); //no page refresh
        const newPet = {
            name: userInput.name,
            breed: userInput.breed,
            isMale: userInput.isMale,
            birthdate: userInput.birthdate,
            isDog: userInput.isDog,
            imageLocation: userInput.imageLocation,
            ownerId: user.id
        };
        if (
            userInput.name &&
            userInput.breed &&
            userInput.birthdate
        ) {
            return addPet(newPet)
                .then(() => navigate("/"));
        } else {
            alert("Please complete the form");
        }
    };

    const handleInputChange = (event) => {
        const copy = { ...userInput };

        if (event.target.type === "checkbox") {
            copy[event.target.name] = event.target.checked
        } else {
            copy[event.target.name] = event.target.value;
        }

        setUserInput(copy);
    };


    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Add a Furry Friend</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Pet Name: </label>
                    <input
                        required
                        autoFocus
                        name="name"
                        type="string"
                        className="form-control"
                        placeholder="Your furry friend's name"
                        value={userInput.name}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="breed">Breed: </label>
                    <input
                        required
                        autoFocus
                        name="breed"
                        type="string"
                        className="form-control"
                        placeholder="ex. mixed breed"
                        value={userInput.imageUrl}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="isMale">Is your pet Male?: </label>
                    <input
                        autoFocus
                        name="isMale"
                        type="checkbox"
                        className="form-control"
                        value={userInput.isMale}
                        onChange={handleInputChange}
                    />Yes
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="birthdate">{`Date of Birth (or close estimate):`}</label>
                    <input
                        required
                        autoFocus
                        name="birthdate"
                        type="date"
                        className="form-control"
                        value={userInput.birthdate}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="isDog">{`Is your pet a dog? (otherwise we will call it a cat).`}</label>
                    <input
                        autoFocus
                        name="isDog"
                        type="checkbox"
                        className="form-control"
                        value={userInput.isDog}
                        onChange={handleInputChange}
                    />Yes
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageLocation">Profile Image URL: </label>
                    <input
                        autoFocus
                        name="imageLocation"
                        type="text"
                        className="form-control"
                        placeholder="http://www.pet.com/yourpet"
                        value={userInput.imageLocation}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="submit_button"
            >
                Save
            </button>
        </form>
    );
};