
export default function ResetButton(props) {
    const {setMassSliderV1, setMassSliderV2,setYearSliderV1,setYearSliderV2, setNameSearch,setRecSearch,setSort} = props

    // Reset sorts and filters back to default //
    function resetFilters() {
        // need to add in slider value reset also
        setMassSliderV1(0);
        setMassSliderV2(23000000);
        setYearSliderV1(500);
        setYearSliderV2(2023);
        setNameSearch("");
        setRecSearch(""); 
        setSort("ATOZ");
        console.log("filters reset!")
    }; 

        
        return (
            <>
                <button className="border border-slate-700 test-slate-300 text-slate-700 px-2 py-1 m-2 rounded hover:bg-slate-700 hover:text-slate-100 focus-within:bg-slate-700 outline-none" onClick={(e) => (resetFilters())}>Reset All Filters</button>
            </>
        )
    }
