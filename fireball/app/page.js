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
    <main className="flex flex-col md:flex-row items-center">
      <div className="md:mr-4 mb-4 md:mb-0">
        <Search
          setFilteredDataSet={setFilteredDataSet}
          filteredDataSet={filteredDataSet}
          setSortingMethod={setSortingMethod}
        />
      </div>
      
      <div className="w-full md:w-1/2">
        <Choropleth results={results} />
      </div>
      <div className="w-full md:w-1/2">
        <Table results={results} />
      </div>
    </main>
  );
}
