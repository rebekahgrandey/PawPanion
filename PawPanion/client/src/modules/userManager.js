import { getToken } from "./authManager";

const baseUrl = "/api/user";

export const getCurrentUserByFirebaseId = (firebaseId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${firebaseId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An unknown error occured: could not get current user.",
                );
            }
        });
    });
};