'use client';
import React, { useState } from 'react';
import meteoriteData from 'public/meteoriteData.json';
import Search from './_components/filterComponents/Search';
import Table from './_components/dataTable/Table';
import Choropleth from './_components/summaryMetrics/Choropleth';
import { SortType } from './_components/filterComponents/SortType';

export default function Home() {
  const [filteredDataSet, setFilteredDataSet] = useState(meteoriteData);
  const [sortingMethod, setSortingMethod] = useState(undefined);
  const results = filteredDataSet.sort(SortType[sortingMethod]);

  

  return (
    <main className="flex flex-col  lg:flex-row justify-center items-center  gap-4 m-12">
      <div className="flex basis-2/3 lg:min-w-[500px] min-w-[630px]">
        <Choropleth results={results} />
      </div>
      <div className="flex basis-1/3 flex-col items-center gap-4 ">
        <div className="basis-1/3">
          <Search
            setFilteredDataSet={setFilteredDataSet}
            filteredDataSet={filteredDataSet}
            setSortingMethod={setSortingMethod}
          />
        </div>
        <div className="basis-2/3 ">
          <Table results={results} />
        </div>
      </div>
    </main>
  );
}
