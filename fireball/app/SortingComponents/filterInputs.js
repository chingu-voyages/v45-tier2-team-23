
export default function FilterInputs(props) {
    const {nameSearch,recSearch, setNameSearch,setRecSearch} = props


        // filter name with text input
        function filterName(nasaData){
            return nameSearch.toLowerCase() === '' ? nasaData : nasaData.name.toLowerCase().includes(nameSearch);
        }


        // filter Rec Class with text input
        function filterRecClass(nasaData){
            return recSearch.toLowerCase() === '' ? nasaData : nasaData.recclass.toLowerCase().includes(recSearch);
        }


    return (
        <>
            {/* Filter By Typing Input Fields */}
            <div className="InputSearches">
                <div className="flex flex-col ">
                    <input className="border border-slate-700 rounded bg-slate-700 px-2 py-1 focus:bg-slate-100 outline-slate-700 w-40 m-2" type="text" placeholder="Filter Name" onChange={(e) => setNameSearch(e.target.value.toLowerCase())} value={nameSearch} />
                    <input className="border border-slate-700 rounded bg-slate-700 px-2 py-1 focus:bg-slate-100 outline-slate-700 w-40 m-2" type="text" placeholder="Filter Rec Class" onChange={(e) => setRecSearch(e.target.value.toLowerCase())} value={recSearch} />
                </div>
            </div>
        </>
        )
    }