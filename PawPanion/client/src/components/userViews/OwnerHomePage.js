import "firebase/auth";
import { getUserPets } from "../../modules/petManager";
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

export const OwnerHomePage = () => {
    const [ownerPets, setOwnerPets] = useState([]);
    const navigate = useNavigate();

    const getAll = () => {
        getUserPets().then(ownerPets => setOwnerPets(ownerPets));
    }

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="pet-container">
            {ownerPets.map((pet) => {
                const petPic = pet.imageLocation

                /*
                if (!pet.imageLocation && pet.isDog) {
                    petPic === //DEFAULT DOG PIC URL
                } else if (!pet.imageLocation && !pet.isDog) {
                    petPic === //DEFAULT CAT PIC URL
                } else {
                    petPic === pet.imageLocation
                }
                */

                return <div className="pet-list-container" key={pet.id}>
                    <div><img style={{ width: 200 }} src={pet.imageLocation} /></div>
                    <div>{pet.name}</div>
                    <div>{pet.birthdate}</div>
                    <div>{pet.breed}</div>
                    <div>
                        <Button onClick={() => { navigate(`pet/edit/${pet.id}`) }}>Edit</Button>
                        <Link to={``}>Delete</Link></div>
                    <div><Link to={``}>View All Records</Link></div>
                </div>
            })}
        </div>
    )
}