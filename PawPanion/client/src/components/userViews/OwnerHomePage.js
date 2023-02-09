import "firebase/auth";
import { getUserPets } from "../../modules/petManager";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const OwnerHomePage = () => {
    const [ownerPets, setOwnerPets] = useState([]);

    const getAll = () => {
        getUserPets().then(ownerPets => setOwnerPets(ownerPets));
    }

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="pet-container">
            {ownerPets.map((pet) => {
                return <div className="pet-list-container" key={pet.id}>
                    <div><img style={{ width: 200 }} src={pet.imageLocation} /></div>
                    <div>{pet.name}</div>
                    <div>{pet.birthdate}</div>
                    <div>{pet.breed}</div>
                    <div><Link to={``}>Edit</Link><Link to={``}>Delete</Link></div>
                    <div><Link to={``}>View All Records</Link></div>
                </div>
            })}
        </div>
    )
}