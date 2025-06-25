import React from 'react'

const Recipe = ({ id, name, description, ingredients, instructions, image }) => {
  console.log(image)
  return (
    <article className='card w-80 h-96 bg-base-300 shadow-xl border-2 border-base-200'>
      <figure className=''>
        <img className='object-cover h-56 w-96 shadow' src={image} alt={name} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{name}</h2>
        <p>{description}</p>
        <footer className='card-actions justify-end'><button  className='btn btn-primary'><a href={`/recipes/${id}`}>Ver más</a></button></footer>
      </div>
    </article>
  )
}

export default Recipe