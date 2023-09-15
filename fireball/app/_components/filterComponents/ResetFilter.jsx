import meteoriteData from "public/meteoriteData.json";
export default function ResetButton(props) {
  const {
    setMassSliderV1,
    setMassSliderV2,
    setYearSliderV1,
    setYearSliderV2,
    setNameSearch,
    setRecSearch,
    setFilteredDataSet,
    setIsMassSliderActive
  } = props;

  // Reset sorts and filters back to default //
  function resetFilters() {
    const slider = document.getElementById("MassSlider");
    const slider2 = document.getElementById("YearSlider");
    slider.value1 = 0;
    slider.value2 = 23000000;
    slider2.value1 = 800;
    slider2.value2 = 2023;
    setMassSliderV1(0);
    setMassSliderV2(23000000);
    setYearSliderV1(800);
    setYearSliderV2(2023);
    setNameSearch("");
    setRecSearch("");
    setFilteredDataSet(meteoriteData);
    setIsMassSliderActive(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={(e) => resetFilters()}
        className="w-40 text-accent hover:text-white border border-accent hover:bg-accent focus:ring-2 focus:outline-none focus:ring-acccent font-medium rounded-lg text-sm py-2 text-center dark:border-accent dark:text-accent dark:hover:text-white dark:hover:bg-accent dark:focus:ring-accent ease-in-out duration-300"
      >
        RESET
      </button>
    </div>
  );
}
