export default function SortDropdown(props) {
    const { setFilteredDataSet, filteredDataSet, Sort, setSort} = props


// //  Sorting Functions from dropdown based on type selected
const SortType = { 
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


function handleSort(e) {
    const sortFactor = e.target.value;
    setSort(sortFactor);
    const sortedData =[...filteredDataSet].sort(SortType[sortFactor]);
    setFilteredDataSet(sortedData);
    }


    return (
        <div  className="flex flex-col text-center">
            {/* // sorting Drop Down  */}
            <label  className="border border-slate-700 text-slate-700 bg-slate-100 p-1" htmlFor="Dropdown">Sort By</label >
            <select name="Dropdown" className="border border-slate-100 text-slate-100 bg-slate-700  hover:bg-slate-100 hover:text-slate-700 outline-slate-700 text-center p-1" value={Sort} onChange={handleSort} >
                <option value="ATOZ">A to Z</option>
                <option value="ZTOA">Z to A</option>
                <option value="NEWEST">Newest</option>
                <option value="OLDEST">Oldest</option>
                <option value="HIMASS">Highest Mass</option>
                <option value="LOMASS">Lowest Mass</option>
            </select>
        </div>
    )
}