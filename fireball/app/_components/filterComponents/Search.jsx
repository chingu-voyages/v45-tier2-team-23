import React, { useState } from 'react'
import FilterInputs from './FilterInputs';
import ResetButton from './ResetFilter';
import Sliders from './Sliders';


export default function Search(props) {
    const { setFilteredDataSet, filteredDataSet, setSortingMethod } = props
    const [ massSliderV1, setMassSliderV1 ] = useState(0);
    const [ massSliderV2, setMassSliderV2 ] = useState(23000000);
    const [ yearSliderV1, setYearSliderV1 ] = useState(500);
    const [ yearSliderV2, setYearSliderV2 ] = useState(2023);
    const [ Sort, setSort ] = useState("ATOZ");
    const [ nameSearch,setNameSearch] = useState("");
    const [ recSearch,setRecSearch] = useState("");


    return (
        // <div className="border items-center border-slate-700 p-4">
        <div className="flex flex-wrap border p-3 items-center border-slate-700 min-w-fit justify-center">
            <div className='basis-4/6 px-2 min-w-fit'>
                <Sliders massSliderV1={massSliderV1} setMassSliderV1={setMassSliderV1} massSliderV2={massSliderV2} setMassSliderV2={setMassSliderV2} yearSliderV1={yearSliderV1} setYearSliderV1={setYearSliderV1} yearSliderV2={yearSliderV2} setYearSliderV2={setYearSliderV2} setFilteredDataSet={setFilteredDataSet} />
            </div>
            <div className='flex flex-col items-center mt-2 basis-4/12' >
                <FilterInputs setFilteredDataSet={setFilteredDataSet} nameSearch={nameSearch} setNameSearch={setNameSearch} recSearch={recSearch} setRecSearch={setRecSearch} />
                <ResetButton setMassSliderV1={setMassSliderV1} setMassSliderV2={setMassSliderV2} setYearSliderV1={setYearSliderV1} setYearSliderV2={setYearSliderV2} setNameSearch={setNameSearch} setRecSearch={setRecSearch} setSort={setSort} filteredDataSet={filteredDataSet} setFilteredDataSet={setFilteredDataSet} />
            </div>
        </div>
    )
}