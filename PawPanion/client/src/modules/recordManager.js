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

export const addRecord = (record) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(record)
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

export const deleteRecord = (recordId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/delete/${recordId}`, {
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

export const getRecordById = (id) => {
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

export const getAllRecords = () => {
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


// export const getNewestRecordByPetId = (pet) => {
//     return getToken().then((token) => {
//         return fetch(`${baseUrl}/most-recent/${pet.id}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }).then((res) => {
//             if (res.ok) {
//                 return res.json();
//             } else {
//                 throw new Error(
//                     "An unknown error occured.",
//                 );
//             }
//         });
//     });
// };