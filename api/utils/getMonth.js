export function getMonthRange(month, year) {
    var start = (new Date(year, month, 1)).toISOString().slice(0, 10);

    var end = (new Date(year, month + 1, 0)).toISOString().slice(0, 10);

    return {
        start,
        end
    };
}
