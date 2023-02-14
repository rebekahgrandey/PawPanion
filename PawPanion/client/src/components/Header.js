import firebase from "firebase/app";
import "firebase/auth";
import React, { useState, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { getCurrentUserByFirebaseId } from '../modules/userManager';
import { logout } from '../modules/authManager';


export default function Header({ isLoggedIn }) {
    const [user, setUser] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (isLoggedIn) {
            const currentFirebaseUser = firebase.auth().currentUser.uid
            getCurrentUserByFirebaseId(currentFirebaseUser).then(user => setUser(user));
        }
    }, [isLoggedIn]);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/">Pawpanion</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { /* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/">Home</NavLink>
                                </NavItem>
                                {user && !user.isVet ? <NavItem>
                                    <NavLink tag={RRNavLink} to="/add-pet">Add a Pet</NavLink>
                                </NavItem> : ""}
                            </>
                        }
                    </Nav>

                    <Nav navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/" onClick={(e) => {
                                        setUser();
                                        logout(e);
                                    }}>Logout</NavLink>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}