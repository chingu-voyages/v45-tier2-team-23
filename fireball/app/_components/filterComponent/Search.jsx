import React, { useState } from 'react'
import ResetButton from './filterReset';
import FilterInputs from './filterInputs';





  export default function Search({ filterData, filterReccData }) {
    const [ Sort, setSort ] = useState("ATOZ");
    const [ recSearch,setRecSearch] = useState("");
    const [ massSliderV1, setMassSliderV1 ] = useState(0);
    const [ massSliderV2, setMassSliderV2 ] = useState(23000000);
    const [ yearSliderV1, setYearSliderV1 ] = useState(500);
    const [ yearSliderV2, setYearSliderV2 ] = useState(2023);

    // filter Rec Class with text input
    function filterRecClass(nasaData){
        return recSearch.toLowerCase() === '' ? nasaData : nasaData.recclass.toLowerCase().includes(recSearch);
    }


    return (
      <main>
        Fireballs!
        <br />   {/* remove this br later! */}
        <br />   {/* remove this br later! */}
        <FilterInputs filterData={filterData} filterReccData={filterReccData} recSearch={recSearch} setRecSearch={setRecSearch}/>
        <ResetButton setMassSliderV1={setMassSliderV1} setMassSliderV2={setMassSliderV2} setYearSliderV1={setYearSliderV1} setYearSliderV2={setYearSliderV2} setRecSearch={setRecSearch} setSort={setSort} />
      </main>
    )
  }