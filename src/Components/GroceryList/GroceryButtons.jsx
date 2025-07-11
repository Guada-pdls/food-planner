import { useState } from "react";

const GroceryButtons = ({ ingredients, setIngredients, id }) => {
    const [loadingSelectAll, setLoadingSelectAll] = useState(false)
    const [loadingGenerate, setLoadingGenerate] = useState(false)

    const handleSelectAll = async () => {
        setLoadingSelectAll(true)
        const updated = ingredients.map((item) => ({
            ...item,
            checked: true,
        }));
        setIngredients(updated);
        setLoadingSelectAll(false)
    }

    const handleGenerate = async () => {
        setLoadingGenerate(true)

        const response = await fetch(`/api/grocery-list/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()
        setIngredients(data.grocery_list)

        setLoadingGenerate(false)
    }

    return (
        <div className="flex justify-between px-4 mb-2">
            <button
                className="btn btn-secondary btn-circle w-fit px-5"
                onClick={handleSelectAll}
            >{loadingSelectAll ? "Cargando..." : "Marcar todos"}</button>
            <button
                className="btn btn-primary btn-circle w-fit px-5"
                onClick={handleGenerate}
            >{loadingGenerate ? "Cargando..." : "Generar automáticamente"}</button>
        </div>
    )
}

export default GroceryButtons