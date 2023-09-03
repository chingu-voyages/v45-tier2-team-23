'use client';
import React, { useState } from 'react';
import meteoriteData from 'public/meteoriteData.json';
import Search from './_components/filterComponents/Search';
import Table from './_components/dataTable/Table';
import { SortType } from './_components/filterComponents/SortType';

export default function Home() {
  const [filteredDataSet, setFilteredDataSet] = useState(meteoriteData);
  const [sortingMethod, setSortingMethod] = useState(undefined);
  const results = filteredDataSet.sort(SortType[sortingMethod]);

  return (
    <main className='flex'>
      <Search
        setFilteredDataSet={setFilteredDataSet}
        filteredDataSet={filteredDataSet}
        setSortingMethod={setSortingMethod}
      />
      <Table results={results} />
      <Display results={results} />
    </main>
  );
}
