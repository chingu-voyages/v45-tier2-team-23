import React, { useState } from "react";
import FilterInputs from "./FilterInputs";
import ResetButton from "./ResetFilter";
import Sliders from "./Sliders";

export default function Search(props) {
  const {
    setFilteredDataSet,
    filteredDataSet,
    nameSearch,
    recSearch,
    setNameSearch,
    setRecSearch,
    massSliderV1,
    setMassSliderV1,
    massSliderV2,
    setMassSliderV2,
    yearSliderV1,
    setYearSliderV1,
    yearSliderV2,
    setYearSliderV2,
    setIsMassSliderActive,
  } = props;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 border-slate-700 min-w-fit justify-center md:py-4">
      <div className="basis-4/6 pr-1 min-w-fit">
        <Sliders
          massSliderV1={massSliderV1}
          setMassSliderV1={setMassSliderV1}
          massSliderV2={massSliderV2}
          setMassSliderV2={setMassSliderV2}
          yearSliderV1={yearSliderV1}
          setYearSliderV1={setYearSliderV1}
          yearSliderV2={yearSliderV2}
          setYearSliderV2={setYearSliderV2}
          setIsMassSliderActive={setIsMassSliderActive}
        />
      </div>
      <div className="flex flex-col items-center ml-2 mt-2 basis-4/12 p-4 md:py-6">
        <FilterInputs
          nameSearch={nameSearch}
          setNameSearch={setNameSearch}
          recSearch={recSearch}
          setRecSearch={setRecSearch}
        />
        <ResetButton
          setMassSliderV1={setMassSliderV1}
          setMassSliderV2={setMassSliderV2}
          setYearSliderV1={setYearSliderV1}
          setYearSliderV2={setYearSliderV2}
          setNameSearch={setNameSearch}
          setRecSearch={setRecSearch}
          filteredDataSet={filteredDataSet}
          setFilteredDataSet={setFilteredDataSet}
          setIsMassSliderActive={setIsMassSliderActive}
        />
      </div>
    </div>
  );
}
