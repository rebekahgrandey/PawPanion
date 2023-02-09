import firebase from "firebase/app";
import "firebase/auth";
import { VetHomePage } from "./VetHomePage";
import { OwnerHomePage } from "./OwnerHomePage";

export const HomePage = () => {

    var homePage;

    if (!firebase.auth().currentUser.isVet) {
        homePage = <OwnerHomePage />;
    } else {
        homePage = <VetHomePage />;
    }

    return (
        <nav>
            {homePage}
        </nav>
    );
}