'use client'
import React, { useState } from 'react'
import meteoriteData from 'public/meteoriteData.json'
import Search from "./_components/filterComponents/Search";


export default function Home() {
  const rawNasaData = meteoriteData
  const [ filteredDataSet, setFilteredDataSet ] = useState(rawNasaData);
  console.log(filteredDataSet) // for testing data flow // remove later once a display component is inserted

  return (
    <main>
      <h1 className='text-center'>FireBalls!</h1>
      <Search setFilteredDataSet={setFilteredDataSet} rawNasaData={rawNasaData} />
    </main>
  )
}
