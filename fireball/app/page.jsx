"use client";
import React, { useState } from "react";
import meteoriteData from "public/meteoriteData.json";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Search from "./_components/filterComponents/Search";
import Table from "./_components/dataTable/Table";
import Display from "./_components/summaryMetrics/Display";
import { SortType } from "./_components/filterComponents/SortType";

export default function Home() {
  const [filteredDataSet, setFilteredDataSet] = useState(meteoriteData);
  const [sortingMethod, setSortingMethod] = useState(undefined);
  const results = filteredDataSet.sort(SortType[sortingMethod]);

  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <Header />
      <main className="flex-1 lg:grid lg:grid-cols-10 flex flex-col pt-12 px-12 gap-4">
        <div className="lg:col-span-6  lg:min-w-[500px] min-w-[300px]">
          <Display results={results} />
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
      <Footer />
    </div>
  );
}
