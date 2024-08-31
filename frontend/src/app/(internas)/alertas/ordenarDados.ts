import { LinhasLancamentos } from "./page";

export function sortData(
    data: LinhasLancamentos[],
    payload: { sortBy: keyof LinhasLancamentos; reversed: boolean }
) {
    const { sortBy } = payload;

    if (!sortBy) return data;

    return [...data].sort((a, b) => {
        let compareResult = 0;

        if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
            compareResult = a[sortBy].localeCompare(b[sortBy]);
        } else if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
            compareResult = a[sortBy] - b[sortBy];
        } else if (a[sortBy] instanceof Date && b[sortBy] instanceof Date) {
            compareResult = (a[sortBy] as Date).getTime() - (b[sortBy] as Date).getTime();
        }

        return payload.reversed ? -compareResult : compareResult;
    });
}