"use client";

import calculateCaloriesWithFAO from "@/lib/calculations/calculateCaloriesWithFAO";
import calculateMacros from "@/lib/calculations/calculateMacros";
import { useState } from "react";
import MinAndMax from "@/Components/NutitionInfo/MinAndMax"

const Profile = ({ userData }) => {
    const [formData, setFormData] = useState(userData);
    const [error, setError] = useState(null);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (field) => (e) => {
        setFormData({
            ...formData,
            [field]: field === "weight" || field === "height" || field === "age"
                ? +e.target.value
                : e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSaved(false);

        try {
            const response = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const { message } = await response.json();
                throw new Error(message || "Error al guardar los datos");
            }

            setSaved(true);
        } catch (error) {
            setError("Error al guardar los datos. Inténtalo de nuevo más tarde. Error: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="space-y-4 flex flex-col px-4" onSubmit={handleSubmit}>
            <label className="input w-full">
                <span>Peso</span>
                <input
                    type="number"
                    className="grow"
                    value={formData.weight}
                    onChange={handleChange("weight")}
                />
                <kbd className="kbd">Kg</kbd>
            </label>

            <label className="input w-full">
                <span>Altura</span>
                <input
                    type="number"
                    className="grow"
                    value={formData.height}
                    onChange={handleChange("height")}
                />
                <kbd className="kbd">cm</kbd>
            </label>

            <label className="input w-full">
                <span>Edad</span>
                <input
                    type="number"
                    className="grow"
                    value={formData.age}
                    onChange={handleChange("age")}
                />
                <kbd className="kbd">años</kbd>
            </label>

            <label className="input w-full">
                <span>Actividad Física</span>
                <select
                    className="grow"
                    value={formData.physical_activity}
                    onChange={handleChange("physical_activity")}
                >
                    <option value="Baja">Baja</option>
                    <option value="Moderada">Moderada</option>
                    <option value="Alta">Alta</option>
                </select>
            </label>

            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
            </button>

            <h2 className="subtitle">Nutrición recomendada:</h2>
            <MinAndMax {...
                calculateMacros(
                    calculateCaloriesWithFAO(
                        formData.weight || userData.weight,
                        formData.height || userData.height,
                        formData.age > 10 ? formData.age : userData.age,
                        userData.gender,
                        formData.physical_activity
                    ).toFixed(0),
                    userData.gender,
                    formData.weight || userData.weight,
                    formData.physical_activity || userData.physical_activity
                )
            } />
        
            {error && <p className="ps-4 text-error">{error}</p>}
            {saved && <p className="ps-4 text-success">Datos guardados correctamente.</p>}

        </form>
    );
};

export default Profile;

