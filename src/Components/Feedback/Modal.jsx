const Modal = ({ content, btnContent }) => {
    return (
        <>
            <button className="btn" onClick={() => document.getElementById('modal').showModal()}>{btnContent}</button >
            <dialog id="modal" className="modal">
                <div className="modal-box">
                    {content}
                    <div className="modal-action">
                        <form method="dialog" className="modal-backdrop">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Modal