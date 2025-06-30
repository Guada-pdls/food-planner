import Link from 'next/link'
import React from 'react'

const Ingredient = ({ ingredient_id, name, image }) => {
    return (
        <li className='card min-w-80 bg-base-300 shadow-xl border-2 border-base-200'>
            <figure className='h-60 w-80'>
                <img className='object-cover h-60 w-80 shadow' src={image} alt={name} />
            </figure>
            <div className='card-body'>
                <h2 className='card-title'>{name}</h2>
                <footer className='card-actions justify-end'>
                    <Link href={'/ingredients/' + ingredient_id} className='btn btn-primary'>Ver más</Link>
                </footer>
            </div>
        </li>
    )
}

export default Ingredient