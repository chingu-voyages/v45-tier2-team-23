
export default function FilterInputs(props) {
    const {nameSearch,recSearch, setNameSearch,setRecSearch} = props

    
    
    return (
        <>
                            {/* Filter By Typing Input Fields */}
                            <div className="InputSearches">
                                <div className="Searches">
                                    <input className="Search" type="text" placeholder="Filter Name" onChange={(e) => setNameSearch(e.target.value.toLowerCase())} value={nameSearch} />
                                    <input className="Search" type="text" placeholder="Filter Rec Class" onChange={(e) => setRecSearch(e.target.value.toLowerCase())} value={recSearch} />
                                </div>
                            </div>
            </>
        )
    }