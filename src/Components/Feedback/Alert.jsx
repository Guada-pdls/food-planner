import { IoWarningOutline, IoInformationCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";

const Alert = ({
    btnCancel = "Cancelar",
    btnAccept = "Aceptar",
    handleCancel,
    handleAccept,
    message,
    warn = false,
    error = false,
    success = false
}) => {
    // Definir colores y estilos según el tipo
    const getIconColor = () => {
        if (warn) return "text-warning";
        if (error) return "text-error";
        if (success) return "text-success";
        return "text-info";
    };

    const getButtonStyle = () => {
        if (warn) return "btn-warning";
        if (error) return "btn-error";
        if (success) return "btn-success";
        return "btn-info";
    };

    return (
        <div className="bg-base-100 p-6 rounded-lg">
            <div className="text-center mb-4">
                <div className={`inline-block p-3 rounded-full bg-base-200 ${getIconColor()}`}>
                    {warn ? <IoWarningOutline size={48} /> :
                        error ? <IoAlertCircleOutline size={48} /> :
                            success ? <FaRegCheckCircle size={48} /> :
                                <IoInformationCircleOutline size={48} />}
                </div>
            </div>

            <div className="text-center mb-6">
                <p className="text-lg font-medium text-base-content">{message}</p>
            </div>

            <div className="flex gap-3 justify-center">
                <button
                    className="btn btn-outline btn-sm px-6"
                    onClick={handleCancel}
                >
                    {btnCancel}
                </button>
                <button
                    className={`btn btn-sm px-6 ${getButtonStyle()}`}
                    onClick={handleAccept}
                >
                    {btnAccept}
                </button>
            </div>
        </div>
    );
};

export default Alert;