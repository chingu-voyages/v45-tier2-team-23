import meteoriteData from 'public/meteoriteData.json'
export default function FilterInputs(props) {
    const {filteredDataSet, setFilteredDataSet, nameSearch,recSearch, setNameSearch,setRecSearch} = props
    // const {filterDataSet, nameSearch,recSearch, setNameSearch,setRecSearch} = props


    // Function to handle text input for Name field
    function handleNameInput(e) {
        const newText = e.target.value;
        console.log(newText);
        setNameSearch(newText);
        filterDataSet(newText,recSearch);
    }


    // Function to handle text input for RecClass field
    function handleRecInput(e) {
        const newRec = e.target.value;
        console.log(newRec);
        setRecSearch(newRec);
        filterDataSet(nameSearch,newRec);
    }


    // Triggered from filter inputs to manipulate data variable //
    function filterDataSet(searchText,reccText) {
        const filteredData = [...meteoriteData].filter(elem => {
            return elem.name.toLowerCase().includes(searchText.toLowerCase())
        }).filter(elem => {
            return elem.recclass.toLowerCase().includes(reccText.toLowerCase())
        })
        setFilteredDataSet(filteredData);
        console.log(filteredData);
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