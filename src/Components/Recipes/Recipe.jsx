import Link from 'next/link'

const Recipe = ({ id, name, description, image }) => {
  return (
    <article className='card w-80 h-96 bg-base-300 shadow-xl border-2 border-base-200 mb-4'>
      <figure>
        <img className='object-cover h-56 w-96 shadow' src={image} alt={name} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{name}</h2>
        <p>{description}</p>
        <footer className='card-actions justify-end'>
          <Link href={`/recipes/${id}`} className='btn btn-primary'>Ver más</Link>
        </footer>
      </div>
    </article>
  )
}

export default Recipe