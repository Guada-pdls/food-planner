'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';

const inputClass = "input bg-white text-black w-full";
const ajustesFondo = "h-screen flex justify-center items-center bg-base-100";
const boxShadow = "shadow-md shadow-green-500/50";
const ajustesFormulario = "flex flex-col justify-center items-center border-2 border-black p-6 space-y-[10%] bg-green-800 min-w-1/4 min-h-1/2 md:min-w-[20vw] xl:min-w-1/4";

const Page = () => {
  const { data: session, status } = useSession();
  const [error, setError] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que haya sesión
    if (!session || !session.user?.id) {
      console.error('No session or user ID');
      setError(true);
      return;
    }

    const form = event.target;
    const edad = parseInt(form[0].value);
    const peso = parseFloat(form[1].value);
    const altura = parseFloat(form[2].value);
    const actividadFisica = form[3].value;
    const genero = form[4]?.value; 

    if (!edad || !peso || !altura || !actividadFisica) {
      setError(true);
      return;
    }

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          name: session.user.name,
          age: edad,
          weight: peso,
          height: altura,
          physical_activity: actividadFisica,
          gender: genero,
        }),
      });

      if (res.ok) {
        router.push('/preferences');
      } else {
        console.error('Failed to save user data');
      }
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
    }
  };

  if (status === 'loading') return <p>Cargando...</p>;

  return (
    <div className={ajustesFondo}>
      <form className={`${ajustesFormulario} ${boxShadow}`} onSubmit={handleSubmit}>
        <p className='text-center'>Información nutricional usuario</p>
        <input type="number" placeholder="Edad" min={1} max={120} className={inputClass} />
        <input type="number" placeholder="Peso" min={1} className={inputClass} />
        <input type="number" placeholder="Altura" min={1} className={inputClass} />
        <label className={"select " + inputClass}>
          <span className="label">Actividad Física</span>
          <select>
            <option></option>
            <option>Minima</option>
            <option>Baja</option>
            <option>Moderada</option>
            <option>Intensa</option>
          </select>
        </label>
        <label className={"select " + inputClass}>
          <span className="label">Género</span>
          <select>
            <option>Masculino</option>
            <option>Femenino</option>
          </select>
        </label>
        {error && <p className="text-red-500">Por favor, completa todos los campos.</p>}
        <input type="submit" className="input bg-green-600" />
      </form>
    </div>
  );
};

export default Page;
