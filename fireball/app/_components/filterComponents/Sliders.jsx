import React, { useEffect, useRef } from "react";

export default function Sliders(props) {
  const {
    massSliderV1,
    setMassSliderV1,
    massSliderV2,
    setMassSliderV2,
    yearSliderV1,
    setYearSliderV1,
    yearSliderV2,
    setYearSliderV2,
    setIsMassSliderActive
  } = props;

  // Required To Prevent "ReferenceError: HTMLElement"
  useEffect(() => {
    import("toolcool-range-slider");
  });

  // Mass Slider detection to trigger Year Function  //
  const massSliderRef = useRef(null);
  useEffect(() => {
    const slider = massSliderRef.current;
    const onChange = (e) => {
      setMassSliderV1(e.detail.value1);
      setMassSliderV2(e.detail.value2);
      e.detail.value1 === 0 && e.detail.value2 === 23000000 ? setIsMassSliderActive(false):setIsMassSliderActive(true);
    };
    slider?.addEventListener("change", onChange);
    return () => {
      slider?.removeEventListener("change", onChange);
    };
  }, []);

  // YEAR Slider detection to trigger Year Function //
  const yearSliderRef = useRef(null);
  useEffect(() => {
    const slider = yearSliderRef.current;
    const onChange = (e) => {
      setYearSliderV1(e.detail.value1);
      setYearSliderV2(e.detail.value2);
    };
    slider?.addEventListener("change", onChange);
    return () => {
      slider?.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Mass Label and Selected Values */}
      <div>
        <h5 className="flex justify-between mb-2 text-textColor">
          Mass: (kg)
          <span>
            {massSliderV1/1000}-{massSliderV2/1000}
          </span>
        </h5>
      </div>
      {/* Mass Slider */}
      <div className="my-1">
        <tc-range-slider
          // Function Attributes //
          id="MassSlider"
          ref={massSliderRef}
          value-label="#value-1"
          value2-label="#value-2"
          range-dragging="true"
          data="0,20,40,60,80,100,200,400,600,800,1000,1500,2000,3000,4000,5000,6000,7000,8000,10000,12500,15000,20000,30000,40000,50000,80000,100000,120000,150000,200000,250000,300000,330000,408000,500000,600000,1100000,2000000,4000000,23000000"
          value1="0"
          value2="23000000"
          round="0"
          min="0"
          max="23000000"
          // Style Attributes //
          slider-width="100%"
          slider-height="10px"
          slider-bg-fill="#77042B"
          slider-bg="#76877D"
          pointer-width="25px"
          pointer-height="25px"
          pointer-radius="50%"
          pointer-bg="#77042B"
          pointer-bg-hover="#CF9BCB"
          pointer-bg-focus="#CF9BCB"
          pointer1-shadow-focus="0 0 20px #CF9BCB"
          pointer2-shadow-focus="0 0 20px #CF9BCB"
          pointer1-shadow-hover="0 0 20px #CF9BCB"
          pointer2-shadow-hover="0 0 20px #CF9BCB"
          pointer-border="1px solid #104547"
          pointer-border-hover="2px solid #CF9BCB"
          pointer-border-focus="2px solid #CF9BCB"
        ></tc-range-slider>
      </div>
      {/* Year Label and Selected Values */}
      <div className="my-2">
        <h5 className="flex justify-between mb-1 text-textColor">
          Year:
          <span>
            {yearSliderV1}-{yearSliderV2}
          </span>
        </h5>
      </div>
      {/* Year Slider */}
      <div className="my-1">
        <tc-range-slider
          // Function Attributes //
          id="YearSlider"
          ref={yearSliderRef}
          value-label="#value-1"
          value2-label="#value-2"
          range-dragging="true"
          data="800,1350,1475,1500,1600,1650,1700,1725,1750,1775,1800,1825,1850,1875,1900,1910,1920,1930,1940,1950,1960,1970,1980,1990,2000,2005,2010,2015,2023"
          value1="800"
          value2="2023"
          round="0"
          min="800"
          max="2023"
          // Style Attributes //
          slider-width="100%"
          slider-height="10px"
          slider-bg-fill="#77042B"
          slider-bg="#76877D"
          pointer-width="25px"
          pointer-height="25px"
          pointer-radius="50%"
          pointer-bg="#77042B"
          pointer-bg-hover="#CF9BCB"
          pointer-bg-focus="#CF9BCB"
          pointer1-shadow-focus="0 0 20px #CF9BCB"
          pointer2-shadow-focus="0 0 20px #CF9BCB"
          pointer1-shadow-hover="0 0 20px #CF9BCB"
          pointer2-shadow-hover="0 0 20px #CF9BCB"
          pointer-border="1px solid #104547"
          pointer-border-hover="2px solid #CF9BCB"
          pointer-border-focus="2px solid #CF9BCB"
        ></tc-range-slider>
      </div>
    </div>
  );
}
