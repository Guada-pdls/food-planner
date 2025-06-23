import Profile from "@/Components/Profile/Profile"
import { getUserData } from "@/lib/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logout from "@/Components/Auth/Logout";

const page = async () => {
  const session = await getServerSession(authOptions);
  const userData = await getUserData(session.user.email);
  return (
    <main className="pb-20 flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="px-4 py-6 text-2xl">Perfil</h1>
        <Profile userData={userData} />
      </div>
      <div className="px-4 mb-4"><Logout/></div>
    </main>
  )
}

export default page