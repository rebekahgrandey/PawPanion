import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { getCurrentUserByFirebaseId } from "../../modules/userManager";
import { addPet } from "../../modules/petManager";
import "./AddPet.css"

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

        //if (userInput.imageLocation === /*broken link*/) {
        // userInput.imageLocation.copy[event.target.value] === null
        //}

        setUserInput(copy);
    };

    return (
        <div className="nav-extender">
            <form className="form-container mt-5">
                <h2 className="add-label">Add a Furry Friend</h2>
                <fieldset>
                    <div className="">
                        <label htmlFor="name">Pet Name: </label>
                        <div><input
                            required
                            autoFocus
                            name="name"
                            type="string"
                            className="field-input"
                            placeholder="Your furry friend's name"
                            value={userInput.name}
                            onChange={handleInputChange}
                        />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="breed">Breed: </label>
                        <div><input
                            required
                            autoFocus
                            name="breed"
                            type="string"
                            className="field-input"
                            placeholder="ex. mixed breed"
                            value={userInput.imageUrl}
                            onChange={handleInputChange}
                        />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="isMale">Is your pet Male?: </label>
                        <input
                            autoFocus
                            name="isMale"
                            type="checkbox"
                            className="mt-3 mb-3"
                            value={userInput.isMale}
                            onChange={handleInputChange}
                        />Yes
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="birthdate">{`Date of Birth (or close estimate):`}</label>
                        <div>
                            <input
                                required
                                autoFocus
                                name="birthdate"
                                type="date"
                                className="field-input"
                                value={userInput.birthdate}
                                onChange={handleInputChange}
                            /></div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="isDog">{`Is your pet a dog? (otherwise we will call it a cat).`}</label>
                        <input
                            autoFocus
                            name="isDog"
                            type="checkbox"
                            className="mt-3 mb-3"
                            value={userInput.isDog}
                            onChange={handleInputChange}
                        />Yes
                    </div>
                </fieldset>
                <fieldset>
                    <div className="">
                        <label htmlFor="imageLocation">Profile Image URL: </label>
                        <div>
                            <input
                                autoFocus
                                name="imageLocation"
                                type="text"
                                className="field-input"
                                placeholder="http://www.pet.com/yourpet"
                                value={userInput.imageLocation}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>
                <button
                    style={{ borderRadius: "10px" }}
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="submit_button px-2 py-1 mt-3">Add Pet
                </button>
            </form>
        </div>
    );
};