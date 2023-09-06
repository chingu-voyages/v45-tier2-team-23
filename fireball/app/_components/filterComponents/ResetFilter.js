import meteoriteData from 'public/meteoriteData.json'
export default function ResetButton(props) {
    const {setMassSliderV1, setMassSliderV2,setYearSliderV1,setYearSliderV2, setNameSearch,setRecSearch,setSort, setFilteredDataSet} = props


    // Reset sorts and filters back to default //
    function resetFilters() {
        const slider = document.getElementById('MassSlider');
        const slider2 = document.getElementById('YearSlider');
        slider.value1 = 0;
        slider.value2 = 23000000;
        slider2.value1 = 500;
        slider2.value2 = 2023;
        setMassSliderV1(0);
        setMassSliderV2(23000000);
        setYearSliderV1(500);
        setYearSliderV2(2023);
        setNameSearch("");
        setRecSearch(""); 
        setSort("ATOZ");
        setFilteredDataSet(meteoriteData)
    }; 


    return (
        <>
            <button className="border border-slate-700 bg-slate-100 test-slate-300 text-slate-700 p-1 hover:bg-slate-700 hover:text-slate-100" onClick={(e) => (resetFilters())}>Reset All Filters</button>
        </>
    )
}
