import { getToken } from "./authManager";

const baseUrl = "/api/pet";

export const getAllPets = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An unknown error occurred.",
                );
            }
        });
    });
};

export const getUserPets = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/UserPets`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get pictures.",
                );
            }
        });
    });
};

export const addPet = (pet) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(pet)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred.",
                );
            }
        });

    })
};

export const getPetById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
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

export const editPet = (pet) => {
    console.log(pet)
    return getToken().then((token) => {
        return fetch(`${baseUrl}/edit/${pet.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(pet)
        });
    });

};

export const deletePet = (petId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/delete/${petId}`, {
            method: "Delete",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (!res.ok) {
                throw new Error(
                    "An unknown error occurred."
                );
            }
        });
    });
};