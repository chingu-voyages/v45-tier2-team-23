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
    setIsMassSliderActive,
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
        className="w-60 lg:w-40 lg:ml-2 shadow-lg text-white text-bold border border-accent bg-accent hover:bg-btnHover focus:ring-2 focus:outline-none rounded-lg text-sm py-2 text-center ease-in-out duration-300"
      >
        RESET
      </button>
    </div>
  );
}
