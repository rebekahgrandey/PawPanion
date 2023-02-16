import "firebase/auth";
import { getUserPets } from "../../modules/petManager";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAllRecords } from "../../modules/recordManager";
import { factGenerator } from "./PetFacts";

export const OwnerHomePage = () => {
    const [ownerPets, setOwnerPets] = useState([]);
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUserPets().then(ownerPets => setOwnerPets(ownerPets));
    }, []);

    useEffect(() => {
        getAllRecords().then(records => setRecords(records));
    }, []);

    const randomFact = factGenerator()

    return (<>
        <div className="homepage-labels">Did you know?</div>
        {randomFact}
        <div className="homepage-labels">Your Pets</div>
        <div className="pet-container row row-cols-3">

            {ownerPets.map((pet) => {

                const petRecord = records.find(record => record.petId === pet.id)

                //const petPic = pet.imageLocation


                // if (!pet.imageLocation && pet.isDog) {
                //     petPic === //DEFAULT DOG PIC URL
                // } else if (!pet.imageLocation && !pet.isDog) {
                //     petPic === //DEFAULT CAT PIC URL
                // } else {
                //     petPic === pet.imageLocation
                // }



                var petDate = pet.birthdate;
                petDate = petDate.split('T')[0];

                return (<>

                    <Card
                        border='light border border-2 m-3'
                        style={{ width: '18rem' }}
                        key={pet.id}
                        bg='light'
                        text='black'
                        className="shadow p-4">
                        <Card.Img className="rounded-circle border border-5 mx-auto" variant="top" style={{ width: '12rem' }} src={pet.imageLocation} />
                        <Card.Body className="mx-auto text-center">
                            <Card.Title className="mb-3 fs-3">{pet.name}</Card.Title>
                            <Card.Text className="mb-2">DOB: {petDate}</Card.Text>

                            <Card.Text>{pet.breed}</Card.Text>
                            <Card.Text>
                                {petRecord?.weight ? `Weight: ${petRecord?.weight}` : ""}
                            </Card.Text>
                            <Card.Text>
                                {petRecord?.medication ? `Recent medication(s): ${petRecord?.medication}` : ""}
                            </Card.Text>
                            <Card.Text>
                                {petRecord?.illness ? `Recent conditions: ${petRecord?.illness}` : ""}
                            </Card.Text>
                            <Card.Text>
                                {petRecord?.diet ? `Diet plan: ${petRecord?.diet}` : ""}
                            </Card.Text>
                            <Card.Text>
                                {petRecord?.note ? `Most recent vet notes:
                                ${petRecord?.note}
                                Submitted on ${petRecord?.date}` : ""}
                            </Card.Text>

                            <Button onClick={() => { navigate(`record/${pet.id}`) }}>View Records</Button>
                        </Card.Body>
                        <Button className="m" variant="dark" onClick={() => { navigate(`pet/edit/${pet.id}`) }}>Edit</Button>
                        <Button variant="light" onClick={() => { navigate(`pet/delete/${pet.id}`) }}>Delete</Button>

                    </Card>
                </>
                )
            })}
            <Card
                border='light border border-2 m-3'
                style={{ width: '18rem' }}
                bg='light'
                text='black'
                className="shadow p-4">
                <div className="add-pet grow hover"><Link to="/add-pet" style={{ textDecoration: 'none' }}>+ add a pet</Link></div>
            </Card>
        </div>
    </>)
}


{/* <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
        <Card.Title>Profile</Card.Title>
        <Card.Text>
            {pet.name}
        </Card.Text>
        <Card.Text>
            {petDate}
        </Card.Text>
        <Card.Text>
            {pet.breed}
        </Card.Text>
        <Button onClick={() => { navigate(`pet/edit/${pet.id}`) }}>Edit</Button>
        <Button onClick={() => { navigate(`pet/delete/${pet.id}`) }}>Delete</Button>
    </Card.Body>
</Card> */}

{/* <div><img style={{ width: 200 }} src={pet.imageLocation} /></div>
                    <div>{pet.name}</div>
                    <div>{petDate}</div>
                    <div>{pet.breed}</div>
                    <div>
                        <Button onClick={() => { navigate(`pet/edit/${pet.id}`) }}>Edit</Button>
                        <Button onClick={() => { navigate(`pet/delete/${pet.id}`) }}>Delete</Button>
                    </div>
                    <div><Link to={`record/${pet.id}`}>View All Records</Link></div> */}