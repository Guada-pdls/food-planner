'use client'

import { MdDeleteOutline } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { useState } from "react";
import Alert from "../Feedback/Alert";

const RecipeOptions = ({ name, meal_id, portion, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = () => {
        document.getElementById(`delete-modal-${meal_id}`).showModal();
    };

    const handleCancel = () => {
        document.getElementById(`delete-modal-${meal_id}`).close();
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);

        try {
            const response = await fetch(`/api/meals/${meal_id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la receta');
            }

            // Llamar callback si se proporciona
            if (onDelete) {
                onDelete(meal_id);
            }

            // Cerrar modal
            document.getElementById(`delete-modal-${meal_id}`).close();

        } catch (error) {
            console.error('Error:', error);
            // Mantener el modal abierto para mostrar error
        } finally {
            setIsDeleting(false);
        }
    };

    const alertContent = (
        <Alert
            message={`¿Estás seguro de que quieres eliminar "${name}"?`}
            btnCancel="Cancelar"
            btnAccept={isDeleting ? "Eliminando..." : "Eliminar"}
            handleCancel={handleCancel}
            handleAccept={handleConfirmDelete}
            warn={true}
        />
    );

    return (
        <>
            <header className="flex justify-between">
                <h3 className="subtitle2">
                    {name}
                     - Porción: {portion.toFixed(1) || '1'}
                    </h3>
                <div className="flex gap-2">
                    <button className="btn btn-lg btn-circle">
                        <FaExchangeAlt />
                    </button>
                    <button
                        className="btn btn-lg btn-circle"
                        onClick={handleDeleteClick}
                        disabled={isDeleting}
                    >
                        <MdDeleteOutline />
                    </button>
                </div>
            </header>

            {/* Modal personalizado para confirmación */}
            <dialog id={`delete-modal-${meal_id}`} className="modal">
                <div className="modal-box max-w-md">
                    {alertContent}
                </div>
                <div className="modal-backdrop" onClick={handleCancel}></div>
            </dialog>
        </>
    );
};

export default RecipeOptions;