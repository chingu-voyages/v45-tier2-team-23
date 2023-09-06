export default function SortDropdown(props) {
    const { setFilteredDataSet, filteredDataSet, Sort, setSort, setSortingMethod} = props


// Sort Handler
function handleSort(e) {
    const sortFactor = e.target.value;
    setSort(sortFactor);
    setSortingMethod(sortFactor);
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