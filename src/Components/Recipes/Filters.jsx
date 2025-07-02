'use client'
import { useSearchParams, useRouter } from "next/navigation"

const Filters = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const selectedTypes = searchParams.getAll('type')

    const toggleType = (value) => {
        const params = new URLSearchParams(searchParams)
        const current = params.getAll('type')

        if (current.includes(value)) {
            const updated = current.filter(type => type !== value)
            params.delete('type')
            updated.forEach(type => params.append('type', type))
        } else {
            params.append('type', value)
        }
        router.replace(`?${params.toString()}`)
    }

    const resetFilters = () => {
        const params = new URLSearchParams(searchParams)
        params.delete('type')
        router.replace(`?${params.toString()}`)
    }

    const isChecked = (value) => selectedTypes.includes(value)

    return (
        <form className='filter bg-base-300 py-4'>
            <h2 className='subtitle2'>Filtros</h2>
            <h3 className='subtitle3'>Tipo</h3>

            <input className='btn btn-square' type="reset" value="×" onClick={resetFilters} />
            <input className='btn' type="radio" name="types" aria-label="Desayuno/Merienda" value="Desayuno" checked={isChecked('Desayuno')} onChange={() => toggleType('Desayuno')} />
            <input className='btn' type="radio" name="types" aria-label="Almuerzo/Cena" value="Almuerzo" checked={isChecked('Almuerzo')} onChange={() => toggleType('Almuerzo')} />
        </form>
    )
}

export default Filters