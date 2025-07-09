export const formatDateDDMM = (date) =>
    new Intl.DateTimeFormat("es-UY", {
        day: "2-digit",
        month: "2-digit",
    }).format(date);

export const toISODate = (date) => date.toISOString().split('T')[0]

export const formatDate = (date) =>
    new Date(date).toLocaleDateString('es-UY', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

export const parseISODate = (iso) => {
    if (!iso || typeof iso !== 'string') {
        throw new Error(`Fecha inválida: "${iso}" no es un string válido.`)
    }
    const [year, month, day] = iso.split('-').map(Number)
    if (!year || !month || !day) {
        throw new Error(`Fecha inválida: "${iso}" no tiene formato YYYY-MM-DD.`)
    }
    return new Date(Date.UTC(year, month - 1, day))
}