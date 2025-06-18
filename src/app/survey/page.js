'use client';
import React from 'react'

const inputClass = " input bg-white text-black w-full";
const ajustesFondo=" @container h-screen flex justify-center items-center  bg-base-100"
const boxShadow=" shadow-md shadow-green-500/50"
const ajustesFormulario="flex flex-col justify-center items-center ml-100px border-2 border-black p-6 space-y-[10%] @xl:space-y-[2vw]  bg-green-800 min-w-1/4 min-h-1/2 md:min-h-1/2 md:min-w-[20vw] xl:min-h-1/2 xl:min-w-1/4 "


const page = () => {

    const handleSubmit = (event) => {
    event.preventDefault();

    // Obtener valores desde el formulario
    const form = event.target;
    const edad = form[0].value;
    const peso = form[1].value;
    const altura = form[2].value;
    const actividadFisica = form[3].value;

    console.log("Formulario enviado:");
    console.log("Edad:", edad);
    console.log("Peso:", peso);
    console.log("Altura:", altura);
    console.log("Actividad Física:", actividadFisica);
  };
  return (
    <div className={ajustesFondo}> 
      
      <form id='formularioEncuesta' className={ajustesFormulario+boxShadow} onSubmit={handleSubmit}>
        <p className='text-center'>Información nutricional usuario</p>
        <input type="number" placeholder="Edad" min={1} max={120} className={inputClass}   />
        <input type="number" placeholder="Peso" min={1} className={inputClass} />
        <input type="number"  min={1} placeholder="Altura" className={inputClass} />
      <label className={"select"+ inputClass}>
        <span className="label">Actividad Fisica</span>
        <select>
          <option></option>
          <option>Minima</option>
          <option>Baja</option>
          <option>Moderada</option>
          <option>Intensa</option>
        </select>
      </label>

      <input type="submit" placeholder="Altura" className="input bg-green-600" />
      
      </form>
   </div>
    
  )
}

export default page

// edad peso altura actividad fisica