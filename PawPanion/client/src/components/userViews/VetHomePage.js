import { getAllPets } from "../../modules/petManager";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
                    <div
                        className="vet-pet-list-container py-2 mt-3"
                        key={pet.id}
                        style={{ borderRadius: "25px" }}>
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