import { getAllPets } from "../../modules/petManager";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "reactstrap";

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
        <div className="pet-container">
            <div className="row justify-content-center">
                {pets.map((pet) => {
                    return <Card key={pet.id}><div className="pet-list-container">
                        <div>{pet.owner.name} {pet.owner.phone} {pet.name} <img style={{ width: 40 }} src={pet.imageLocation} />
                            <Button onClick={() => { navigate(`record/${pet.id}`) }}>View Records</Button></div></div>
                    </Card>
                })}
            </div>
        </div>
    )
}