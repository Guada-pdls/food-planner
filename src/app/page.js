import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUserData, getUserPreferences } from "@/lib/repos/user";

export default async function Home() {
  
  const session = await getServerSession()

  if (!session) {
    return redirect('/api/auth/signin')
  } 

  const user = await getUserData(session.user.email);

  if (!user) {
    return redirect('/survey')
  }

  const preferences = await getUserPreferences(session.user.email);

  if (!preferences) {
    return redirect('/preferences')
  }

  return redirect('/calendar');
}
