const page = async ({ params }) => {
    let { date } = await params
    date = '27-06-2025' // hardcodeado por ahora
    return (
        <div>page</div>
    )
}

export default page