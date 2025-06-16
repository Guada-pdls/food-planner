import GoogleButton from "@/Components/Auth/GoogleButton";
import Logout from "@/Components/Auth/Logout";
import SignIn from "@/Components/Auth/SignIn";
import { getServerSession } from "next-auth";

export default async function Home() {
  
  const session = await getServerSession()

  if (!session) {
    return (
      <div>
        <h1>Por favor, inicia sesión para continuar</h1>
        <SignIn />
        <p>Si no tienes cuenta, puedes registrarte con Google.</p>
        <GoogleButton />
      </div>
    );
  } else {
    return <div>
      <h1>Logueado como {session.user.email}</h1>
      <Logout/>
    </div>

  }
}
