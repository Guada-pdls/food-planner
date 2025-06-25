'use client'

import { useState } from 'react'

export default function Page() {
  

    return (
        <main  className='mb-6 w-full h-screen '>
            <div className="overflow-x-auto h-full " >
                <table className="table table-xs h-full [&>thead>tr>th]:text-[2.5vw] [&>tbody>tr>th]:text-[3.5vw]" > 
                    <thead >
                        <tr>
                            <th></th>
                            <th>Desayuno</th>
                            <th>Almuerzo</th>
                            <th>Merienda</th>
                            <th>Cena</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Lunes</th>
                            <td>Receta</td>
                        </tr>

                        <tr>
                            <th>Martes</th>
                        </tr>

                        <tr>
                            <th>Miercoles</th>
                        </tr>
                        <tr>
                            <th>Jueves</th>
                        </tr>
                        
                        <tr>
                            <th>Viernes</th>
                        </tr>
                        <tr>
                            <th>Sabado</th>
                        </tr>
                        <tr>
                            <th>Domingo</th>
                        </tr>

                    </tbody>
                </table>
            </div>
        </main>
    )
}

//abajo del dia deberia ir el contenido con etiqueta td