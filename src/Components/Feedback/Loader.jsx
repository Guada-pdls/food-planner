const Loader = ({ size = "sm"}) => {
    return (
        <span className={`loading loading-spinner loading-${size} p-2`}></span>
    )
}

export default Loader