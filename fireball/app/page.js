'use client'
import meteoriteData from 'public/meteoriteData.json'
import React, { useState } from 'react'
import ResetButton from './filterReset'

export default function Home() {

const [ Sort, setSort ] = useState("ATOZ");
const [ nameSearch,setNameSearch] = useState("");
const [ recSearch,setRecSearch] = useState("");
const [ massSliderV1, setMassSliderV1 ] = useState(0);
const [ massSliderV2, setMassSliderV2 ] = useState(23000000);
const [ yearSliderV1, setYearSliderV1 ] = useState(500);
const [ yearSliderV2, setYearSliderV2 ] = useState(2023);

  return (
    <main>
      Fireballs!
      <br />   {/* remove this br later! */}
      <br />   {/* remove this br later! */}
      <ResetButton setMassSliderV1={setMassSliderV1} setMassSliderV2={setMassSliderV2} setYearSliderV1={setYearSliderV1} setYearSliderV2={setYearSliderV2} setNameSearch={setNameSearch} setRecSearch={setRecSearch} setSort={setSort} />
    </main>
  )
}
