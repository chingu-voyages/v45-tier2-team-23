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
    <main className="lg:grid lg:grid-cols-10 flex flex-col m-12 gap-4">
      <div className="lg:col-span-6  lg:min-w-[500px] min-w-[300px]">
        <Choropleth results={results} />
      </div>
      <div className="lg:col-span-4 flex flex-col justify-start gap-4">
        <div className="">
          <Search
            setFilteredDataSet={setFilteredDataSet}
            filteredDataSet={filteredDataSet}
            setSortingMethod={setSortingMethod}
          />
        </div>
        <div className="">
          <Table results={results} />
        </div>
      </div>
    </main>
  );
}