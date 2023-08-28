import { useState } from 'react'

export default function FilterInputs( {recSearch, filterData, filterReccData, setRecSearch} ) {
    const [ nameSearch,setNameSearch] = useState("");
    const [ reccSearch,setReccSearch] = useState("");

    
        function handleInput(event) {
            const newText = event.target.value;
            setNameSearch(newText);
            filterData(newText,reccSearch);
            
        }

        function handleReccInput(event) {
            const newRecc = event.target.value;
            setReccSearch(newRecc);
            filterData(nameSearch,newRecc);
            
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
                    <input className="border border-slate-700 rounded bg-slate-700 px-2 py-1 focus:bg-slate-100 outline-slate-700 w-40 m-2" type="text" placeholder="Filter Name" onChange={handleInput} value={nameSearch} />
                    <input className="border border-slate-700 rounded bg-slate-700 px-2 py-1 focus:bg-slate-100 outline-slate-700 w-40 m-2" type="text" placeholder="Filter Rec Class" onChange={handleReccInput} value={reccSearch} />
                </div>
            </div>
        </>
        )
    }