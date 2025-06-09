import React from 'react'

const page = () => {
  return (
    <form id='formularioEncuesta' className="flex flex-col ">
      <input type="number" placeholder="Edad" className=""  />
      <input type="number" placeholder="Peso" className="input" />
      <input type="number" placeholder="Altura" className="input" />
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


    </form>
    
    

  )
}

export default page

// edad peso altura actividad fisica