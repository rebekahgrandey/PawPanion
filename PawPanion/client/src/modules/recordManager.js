import { getToken } from "./authManager";

const baseUrl = "/api/record";

export const getPetRecordsById = (petId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${petId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An unknown error occured.",
                );
            }
        });
    });
};