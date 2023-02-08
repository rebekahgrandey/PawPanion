import { getAllPets } from "../../modules/petManager";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";

export const VetHomePage = () => {
    const [pets, setPets] = useState([]);

    const getAll = () => {
        getAllPets().then(pets => setPets(pets));
    }

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="pet-container">
            <div className="pet_list_header"><div className="pet-left">Owner</div><div className="pet-center">Number</div><div className="pet-right">Pet</div></div>
            <div className="row justify-content-center">
                {pets.map((pet) => {
                    return <Card key={pet.id}><div className="pet-list-container">
                        <div className="pet_elements pet-left">{pet.owner.phone}</div>
                        <div className="post_elements post-center">{pet.owner.name}</div>
                        <div className="post_elements post-right"><Link to={``}>{pet.name}</Link></div>
                        <div></div>
                    </div></Card>
                })}
            </div>
        </div>
    )
}