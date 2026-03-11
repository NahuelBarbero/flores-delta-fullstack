import { differenceInCalendarDays, format } from "date-fns";
import { es } from "date-fns/locale";

export interface EventTimeInfo {
    /** Día de vida de la planta (1 = día de creación). null si no hay fechaCreacion */
    diaVida: number | null;
    /** Semana de vida (1 = primera semana). null si no hay fechaCreacion */
    semanaVida: number | null;
    /** Formato corto: "15/02/26" */
    fechaCorta: string;
    /** Formato largo: "sábado 15 de febrero" */
    fechaLarga: string;
    /** Solo hora: "14:30" */
    hora: string;
    /** Formato completo: "15 feb 2026, 14:30" */
    fechaCompleta: string;
}

/**
 * Calcula toda la información temporal de un evento.
 * Si se provee fechaCreacionPlanta, calcula día y semana de vida.
 * Si no, esos campos vienen como null.
 */
export function eventTimeInfo(
    fechaEvento: string,
    fechaCreacionPlanta?: string | null
): EventTimeInfo {
    const evento = new Date(fechaEvento);

    let diaVida: number | null = null;
    let semanaVida: number | null = null;

    if (fechaCreacionPlanta) {
        const inicio = new Date(fechaCreacionPlanta);
        const diff = differenceInCalendarDays(evento, inicio);
        diaVida = Math.max(1, diff + 1);
        semanaVida = Math.max(1, Math.ceil(diaVida / 7));
    }

    return {
        diaVida,
        semanaVida,
        fechaCorta: format(evento, "dd/MM/yy", { locale: es }),
        fechaLarga: format(evento, "EEEE d 'de' MMMM", { locale: es }),
        hora: format(evento, "HH:mm"),
        fechaCompleta: format(evento, "dd MMM yyyy, HH:mm", { locale: es }),
    };
}
