import firebase from "firebase/app";
import "firebase/auth";
import { useEffect, useState } from "react";
import { VetHomePage } from "./VetHomePage";
import { OwnerHomePage } from "./OwnerHomePage";
import { getCurrentUserByFirebaseId } from "../../modules/userManager";
import "./HomePage.css"

export const HomePage = () => {
    const [user, setUser] = useState([])
    var homePage;
    const currentFirebaseUser = firebase.auth().currentUser.uid

    const getUser = () => {
        getCurrentUserByFirebaseId(currentFirebaseUser).then(user => setUser(user));
    }

    useEffect(() => {
        getUser();
    }, []);

    if (!user.isVet) {
        homePage = <OwnerHomePage />;
    } else {
        homePage = <VetHomePage />;
    }

    return (
        <>
            <h2 className="welcome-user">Welcome back, {user.name}</h2>
            {homePage}
        </>
    );
}