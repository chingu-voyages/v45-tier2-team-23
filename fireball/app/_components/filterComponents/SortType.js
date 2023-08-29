export const SortType = { 
    ATOZ: (a,b) => a.name.localeCompare(b.name),
    ZTOA: (a,b) => b.name.localeCompare(a.name),
    OLDEST: (a,b) => a.year > b.year ? 1 : -1,
    NEWEST: (a,b) => a.year < b.year ? 1 : -1,
    LOMASS: (a,b) => {    
        // equal items sort equally
        if (a.mass === b) {
            return 0;
        }
        // nulls and undefined sort after anything else
        if (a.mass === null || a.mass === undefined) {
            return 1;
        }
        if (b.mass === null || b.mass === undefined ) {
            return -1;
        }
        // compare whats left
        return a.mass - b.mass
    },
    HIMASS: (a,b) =>
    {    // equal items sort equally
        if (a.mass === b.mass) {
            return 0;
        }
        // nulls and undefined sort after anything else
        if (a.mass === null || a.mass === undefined) {
            return 1;
        }
        if (b.mass === null || b.mass === undefined) {
            return -1;
        }
        // compare whats left
        return b.mass - a.mass
    }
};