import React from 'react'

const inputClass = "input";
const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with name:');
};


const page = () => {

  

  return (
    <div className="h-screen flex justify-center items-center "> 
      <form id='formularioEncuesta' className="flex flex-col ml-100px bg-white border-2 border-red-600 p-8 space-y-4" onSubmit={handleSubmit}>
        <input type="number" placeholder="Edad" min={1} className={inputClass}   />
        <input type="number" placeholder="Peso" min={1} className={inputClass} />
        <input type="number"  min={1} placeholder="Altura" className={inputClass} />
      <label className="select">
        <span className="label">Actividad Fisica</span>
        <select>
          <option></option>
          <option>Sedentarismo/Ninguna</option>
          <option>Baja</option>
          <option>Moderada</option>
          <option>Alta</option>
        </select>
      </label>

      <input type="submit" placeholder="Altura" className="input bg-green-600" />
      
      </form>
   </div>
    
  )
}

export default page

// edad peso altura actividad fisica