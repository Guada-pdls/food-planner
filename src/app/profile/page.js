import Profile from "@/Components/Profile/Profile"
import { getUserData } from "@/lib/repos/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logout from "@/Components/Auth/Logout";
import VerticalBarChart from "@/Components/Profile/VerticalChart";

const page = async () => {
  const session = await getServerSession(authOptions);
  const userData = await getUserData(session.user.email);
  return (
    console.log(<Profile userData={userData} />),
    <main className="pb-20 flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="title">Perfil</h1>
        <Profile userData={userData}/>
      </div>
      <div className="px-4 mb-4"><Logout/></div>
       <div className="h-96">
                <VerticalBarChart />
            </div>
    </main>
    
  )
}

export default page