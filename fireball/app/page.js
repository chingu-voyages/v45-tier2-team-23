'use client'
import React, { useState } from 'react'
import meteoriteData from 'public/meteoriteData.json'
import Search from "./_components/filterComponents/Search";
import { SortType } from './_components/filterComponents/SortType';


export default function Home() {
  const [ filteredDataSet, setFilteredDataSet ] = useState(meteoriteData);
  const [ sortingMethod, setSortingMethod ] = useState(undefined)
  const Results = filteredDataSet.sort(SortType[sortingMethod]) // USE THIS VARIABLE TO GAIN ACCESS TO BOTH SORTED AND FILTERED DATA
  console.log("Results: ", Results) // for testing data flow // remove later once a display component is inserted


  return (
    <main>
      <h1 className='text-center'>FireBalls!</h1>
      <Search setFilteredDataSet={setFilteredDataSet} filteredDataSet={filteredDataSet} setSortingMethod={setSortingMethod}/>

      {Results.map((nasaObj)=>{
                            const date = new Date(nasaObj.year)
                            const year = date.getFullYear();
                            return (
                        <div>
                            <p className="m-4" key={nasaObj.id}> Name: {nasaObj.name} , Year: {year}, <br />RecClass: {nasaObj.recclass} , Mass: {nasaObj.mass}</p>
                        </div>
                            )
                        })}
    </main>
  )
}
