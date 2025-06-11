import React from 'react'

const Recipe = ({ id, title, description, ingredients, instructions, imgUrl }) => {
  return (
    <article className='card w-96 bg-base-300 shadow-xl border-2 border-base-200'>
      <figure className=''>
        <img className='object-cover h-56 w-96 shadow' src={imgUrl} alt={title} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p>{description}</p>
        <footer className='card-actions justify-end'><button  className='btn btn-primary'><a href={`/recipes/${id}`}>Ver más</a></button></footer>
      </div>
    </article>
  )
}

export default Recipe