export default function ResetButton(props) {
    const {setMassSliderV1, setMassSliderV2,setYearSliderV1,setYearSliderV2, setNameSearch,setRecSearch,setSort, rawNasaData, setFilteredDataSet} = props


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
        setFilteredDataSet(rawNasaData)
        console.log("filters reset!")
    }; 


    return (
        <>
            <button className="border border-slate-700 bg-slate-100 test-slate-300 text-slate-700 p-1 hover:bg-slate-700 hover:text-slate-100" onClick={(e) => (resetFilters())}>Reset All Filters</button>
        </>
    )
}
