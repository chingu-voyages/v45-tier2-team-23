import meteoriteData from 'public/meteoriteData.json'
export default function FilterInputs(props) {
    const {setFilteredDataSet, nameSearch,recSearch, setNameSearch,setRecSearch} = props


    // Function to handle text input for Name field
    function handleNameInput(e) {
        const newName = e.target.value;
        setNameSearch(newName);
        filterDataSet(newName,recSearch);
    }


    // Function to handle text input for RecClass field
    function handleRecInput(e) {
        const newRec = e.target.value;
        setRecSearch(newRec);
        filterDataSet(nameSearch,newRec);
    }


    // Triggered from filter inputs to manipulate data variable //
    function filterDataSet(nameInput,recInput) {
        const filteredData = [...meteoriteData].filter(meteorObj => {
            return meteorObj.name.toLowerCase().includes(nameInput.toLowerCase())
        }).filter(meteorObj => {
            return meteorObj.recclass.toLowerCase().includes(recInput.toLowerCase())
        })
        setFilteredDataSet(filteredData);
    }


    return (
        <>
            {/* Filter By Typing Input Fields */}
            <div className="InputSearches">
                <div className="flex flex-col w-40">
                    <input className="border border-slate-100 text-slate-100 bg-slate-700 p-1 focus:bg-slate-100 focus:text-slate-700 outline-slate-700" type="text" placeholder="Filter Name" onChange={handleNameInput} value={nameSearch} />
                    <input className="border border-slate-100 text-slate-100 bg-slate-700 p-1 my-1 focus:bg-slate-100 focus:text-slate-700 outline-slate-700" type="text" placeholder="Filter Composition" onChange={handleRecInput} value={recSearch} />
                </div>
            </div>
        </>
    )
}