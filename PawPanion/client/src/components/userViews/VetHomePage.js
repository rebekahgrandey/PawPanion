import { getAllPets } from "../../modules/petManager";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "reactstrap";
import "./HomePage.css"

export const VetHomePage = () => {
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    const getAll = () => {
        getAllPets().then(pets => setPets(pets));
    }

    useEffect(() => {
        getAll();
    }, []);

    return (

        <div className="vetHomeContainer">
            {pets.map((pet) => {
                return (
                    <div className="pet-list-container" key={pet.id}>
                        <div className="pet-list-container-owner"><div style={{ marginRight: "2rem" }}>{pet.owner.name}</div> <div>{pet.owner.phone}</div></div>
                        <div>{pet.name} <img style={{ width: 40 }} src={pet.imageLocation} />
                            <Button onClick={() => { navigate(`record/${pet.id}`) }}>View Records</Button>
                        </div>

                    </div>
                )
            })}
        </div>

    )
}