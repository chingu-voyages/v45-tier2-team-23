'use client'
import meteoriteData from 'public/meteoriteData.json';
import React, { useState } from 'react';
import Search from './_components/filterComponent/Search';


export default function Home() {
  const [ filteredDataSet, setFilteredDataSet ] = useState(meteoriteData);

  function filterDataSet(searchText,reccText) {
    console.log(reccText);
    // manipulate data variable //
    const filteredData = meteoriteData.filter(elem => {
      return elem.name.toLowerCase().includes(searchText.toLowerCase())
    }).filter(elem => {
      return elem.recclass.toLowerCase().includes(reccText.toLowerCase())
    })
    setFilteredDataSet(filteredData);
  }

  function filterReccData(reccText) {
    
    // manipulate data variable //
    const filteredData = meteoriteData.filter(elem => {
      return elem.recclass.toLowerCase().includes(reccText.toLowerCase())
    });
    setFilteredDataSet(filteredData);
  }
  

  console.log(filteredDataSet)
  return (
    <>
      <br />   {/* remove this br later! */}
      <br />   {/* remove this br later! */}
      <Search filterData={filterDataSet} filterReccData={filterReccData}/>
    </>
  )
}
