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

export function getWeekRange(refDate) {
    // Crea una nueva fecha para no modificar la original.
    const date = new Date(refDate);

    // Obtiene el día de la semana (0 para Domingo, 1 para Lunes, ..., 6 para Sábado).
    const day = date.getDay();

    // Calcula el lunes de esa semana.
    // Si el día es Domingo (0), retrocede 6 días. Si no, retrocede (día - 1) días.
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(date.setDate(diff));

    // Calcula el domingo de esa semana sumando 6 días al lunes.
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    // Formatea las fechas a ISO (YYYY-MM-DD).
    const startISO = start.toISOString().split('T')[0];
    const endISO = end.toISOString().split('T')[0];

    return {
        start: startISO,
        end: endISO,
    };
}