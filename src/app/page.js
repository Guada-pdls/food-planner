import GoogleButton from "@/Components/Auth/GoogleButton";
import Logout from "@/Components/Auth/Logout";
import SignIn from "@/Components/Auth/SignIn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUserData, getUserPreferences } from "@/lib/user";

export default async function Home() {
  
  const session = await getServerSession()

  if (!session) {
    redirect('/api/auth/signin')
  } 

  const user = await getUserData(session.user.email);

  if (!user) {
    redirect('/survey')
  }

  const preferences = await getUserPreferences(session.user.email);

  if (!preferences) {
    redirect('/preferences')
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.name}!</h1>
      <Logout />
    </div>
  );

}
