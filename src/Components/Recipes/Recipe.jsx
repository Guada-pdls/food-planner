import React from 'react'

const Recipe = ({ id, title, description, ingredients, instructions, imgUrl }) => {
  return (
    <article className='card'>
      <figure>
        <img src={imgUrl} alt={title} />
      </figure>
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={`/recipes/${id}`}>Ver más</a>
    </article>
  )
}

export default Recipe