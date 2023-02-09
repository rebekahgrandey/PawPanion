import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../modules/authManager";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [imageLocation, setImageLocation] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [userType, setUserType] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = {
                name,
                email,
                phone,
                imageLocation,
                userType,
            };
            register(userProfile, password).then(() => navigate("/"));
        }
    };

    return (
        <Form onSubmit={registerClick}>
            <fieldset>
                <FormGroup>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input
                        id="phone"
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="imageLocation">Profile Image URL</Label>
                    <Input
                        id="imageLocation"
                        type="text"
                        onChange={(e) => setImageLocation(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="userType">Check box if you are a vet:</Label>
                    <Input
                        id="userType"
                        type="checkbox"
                        onChange={(e) => setUserType(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button>Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}
