export default function FilterInputs(props) {
    const {filterDataSet, nameSearch,recSearch, setNameSearch,setRecSearch} = props


    function handleNameInput(e) {
        const newText = e.target.value;
        setNameSearch(newText);
        filterDataSet(newText,recSearch);
    }


    function handleRecInput(e) {
        const newRec = e.target.value;
        setRecSearch(newRec);
        filterDataSet(nameSearch,newRec);
    }


    return (
        <>
            {/* Filter By Typing Input Fields */}
            <div className="InputSearches">
                <div className="flex flex-col ">
                    <input className="border border-slate-100 text-slate-100 bg-slate-700 px-2 py-1 focus:bg-slate-100 focus:text-slate-700 outline-slate-700" type="text" placeholder="Filter Name" onChange={handleNameInput} value={nameSearch} />
                    <input className="border border-slate-100 text-slate-100 bg-slate-700 px-2 py-1 focus:bg-slate-100 focus:text-slate-700 outline-slate-700" type="text" placeholder="Filter Rec Class" onChange={handleRecInput} value={recSearch} />
                </div>
            </div>
        </>
    )
}