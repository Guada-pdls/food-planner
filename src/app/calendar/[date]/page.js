import DayDetail from "@/Components/Calendar/DayDetail"
import { getMealsByDate } from "@/lib/repos/meals"
import { getUserData } from "@/lib/repos/user"
import { getServerSession } from "next-auth"

const page = async ({ params }) => {
    let { date } = await params
    let session = await getServerSession() 
    let user = await getUserData(session.user.email)

    let meals = await getMealsByDate(session.user.id, date)

    return (
        <main className="pb-20">
            <h1 className="title">Detalle del día {date}</h1>
            <DayDetail meals={meals} date={date} user={user} />
        </main>
    )
}

export default page