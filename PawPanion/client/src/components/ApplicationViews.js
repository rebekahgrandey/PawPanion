import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { HomePage } from "./userViews/HomePage";
import { AddPetForm } from "./Pets/AddPet";
import { EditPetForm } from "./Pets/EditPet";
import { DeletePetPage } from "./Pets/DeletePet";
import { RecordsByPetId } from "./Records/RecordList";
import { AddRecordForm } from "./Records/AddRecord";
import { DeleteRecord } from "./Records/DeleteRecord";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">

                    <Route
                        index
                        element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
                    />

                    <Route path="add-pet" element={<AddPetForm />} />
                    <Route path="pet/edit/:petId" element={<EditPetForm />} />
                    <Route path="pet/delete/:petId" element={<DeletePetPage />} />
                    <Route path="record/:petId" element={<RecordsByPetId />} />
                    <Route path="record/add/:petId" element={<AddRecordForm />} />
                    <Route path="record/delete/:recordId" element={<DeleteRecord />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
};
