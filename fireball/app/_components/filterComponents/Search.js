import React, { useState } from 'react'
import FilterInputs from './FilterInputs';
import SortDropdown from './Sort';
import ResetButton from './FilterReset';


export default function Search(props) {
    const { setFilteredDataSet, rawNasaData } = props
    const [ massSliderV1, setMassSliderV1 ] = useState(0);
    const [ massSliderV2, setMassSliderV2 ] = useState(23000000);
    const [ yearSliderV1, setYearSliderV1 ] = useState(500);
    const [ yearSliderV2, setYearSliderV2 ] = useState(2023);
    const [ Sort, setSort ] = useState("ATOZ");
    // const [ SortType, setSortType ] = useState(Sort)
    const [ nameSearch,setNameSearch] = useState("");
    const [ recSearch,setRecSearch] = useState("");


    function filterDataSet(searchText,reccText) {
        console.log(reccText);
        // manipulate data variable //
        const filteredData = rawNasaData.filter(elem => {
            return elem.name.toLowerCase().includes(searchText.toLowerCase())
        }).filter(elem => {
            return elem.recclass.toLowerCase().includes(reccText.toLowerCase())
        })
        setFilteredDataSet(filteredData);
    }


    // function sortDataSet(sortFactor) {  //  NOT IN USE YET  add into props sortDataSet={sortDataSet}
    //     console.log(sortFactor);
    //     // manipulate data variable //
    //     const filteredDataSet = filterDataSet(nameSearch,recSearch)
    //     console.log("HERE!!")
    //     console.log(sortFactor)
    //     const sortedDataSet =filteredDataSet.sort(sortFactor);
    //     setFilteredDataSet(sortedDataSet);
    // }


    return (
        <div className='flex flex-col w-52 p-4 border border-slate-700' >
            <SortDropdown Sort={Sort} setSort={setSort} />
            <FilterInputs filterDataSet={filterDataSet} nameSearch={nameSearch} setNameSearch={setNameSearch} recSearch={recSearch} setRecSearch={setRecSearch}/>
            <ResetButton setMassSliderV1={setMassSliderV1} setMassSliderV2={setMassSliderV2} setYearSliderV1={setYearSliderV1} setYearSliderV2={setYearSliderV2} setNameSearch={setNameSearch} setRecSearch={setRecSearch} setSort={setSort} rawNasaData={rawNasaData} setFilteredDataSet={setFilteredDataSet} />
        </div>
    )
}