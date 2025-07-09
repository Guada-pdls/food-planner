'use client'
import { useSearchParams, useRouter } from "next/navigation"

const Filters = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const selectedTypes = searchParams.getAll('type')
    const selectedTime = searchParams.getAll('time')[0] || ''

    const updateParams = (key, value) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        router.replace(`?${params.toString()}`)
    }

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
        params.delete('time')
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

            <h3 className='subtitle3 mt-4'>Tiempo máximo (min)</h3>
            <select
                className='select select-bordered'
                value={selectedTime}
                onChange={(e) => updateParams('time', e.target.value || undefined)}
            >
                <option defaultChecked value=''>Cualquiera</option>
                <option value='15'>≤ 15 min</option>
                <option value='30'>≤ 30 min</option>
                <option value='45'>≤ 45 min</option>
                <option value='60'>≤ 60 min</option>
            </select>
        </form>
    )
}

export default Filters