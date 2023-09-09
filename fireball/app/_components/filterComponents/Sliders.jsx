import meteoriteData from 'public/meteoriteData.json'
import React, { useEffect, useRef } from "react";


export default function Sliders (props){
    const {massSliderV1, setMassSliderV1, massSliderV2, setMassSliderV2, yearSliderV1, setYearSliderV1, yearSliderV2, setYearSliderV2, setFilteredDataSet} = props


    // Required To Prevent "ReferenceError: HTMLElement"
    useEffect(() =>{
        import('toolcool-range-slider');
    });


    // Mass Slider detection to trigger Year Function  //
    const massSliderRef = useRef(null);
    useEffect(() => {
        const slider = massSliderRef.current;
        const onChange = (e) => {
            const val1 = e.detail.value1;
            const val2 = e.detail.value2;
            setMassSliderV1(val1)
            setMassSliderV2(val2)
            MassSliderFilter(val1, val2)
        };
        slider?.addEventListener('change', onChange);
        return () => {
            slider?.removeEventListener('change', onChange);
        };
    }, []);


    // Mass Slider Filter Function //
    function MassSliderFilter(massSliderV1,massSliderV2) {
        const filteredData = [...meteoriteData].filter(elem => {
            return elem.mass > massSliderV1 && elem.mass < massSliderV2; 
        })
        setFilteredDataSet(filteredData);
    }


    // YEAR Slider detection to trigger Year Function //
    const yearSliderRef = useRef(null);
    useEffect(() => {
        const slider = yearSliderRef.current;
        const onChange = (e) => {
            const val1 = e.detail.value1;
            const val2 = e.detail.value2;
            setYearSliderV1(val1)
            setYearSliderV2(val2)
            YearSliderFilter(val1, val2)
        };
        slider?.addEventListener('change', onChange);
        return () => {
            slider?.removeEventListener('change', onChange);
        };
    }, []);


        // Year Slider Filter Function //
        function YearSliderFilter(YearVal1,YearVal2) {
            const filteredData = [...meteoriteData].filter(elem => {
                    const date = new Date(elem.year)
                    const year = date.getFullYear();
                    return year > YearVal1 && year < YearVal2 ;
            })
            setFilteredDataSet(filteredData);
        }


    return (
        <div className="flex flex-col">
            {/* Mass Label and Selected Values */}
            <div>
                <h5 className="flex justify-between mb-1">Mass: <span>{massSliderV1}-{massSliderV2}</span> </h5>
                
            </div>
            {/* Mass Slider */}
            <div className="my-1">
                <tc-range-slider
                    // Function Attributes //
                    id="MassSlider"
                    ref={ massSliderRef }
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
                    slider-height="7px"
                    slider-bg-fill="#77042B"
                    slider-bg="#76877D"
                    pointer-width="20px"
                    pointer-height="20px"
                    pointer-radius="5px"
                    pointer-bg="#77042B"
                    pointer-bg-hover="#CF9BCB"
                    pointer-bg-focus="#CF9BCB"
                    pointer1-shadow-focus =	"0 0 20px #CF9BCB"
                    pointer2-shadow-focus =	"0 0 20px #CF9BCB"
                    pointer1-shadow-hover =	"0 0 20px #CF9BCB"
                    pointer2-shadow-hover =	"0 0 20px #CF9BCB"
                    pointer-border="1px solid black"
                    pointer-border-hover="2px solid #CF9BCB"
                    pointer-border-focus="2px solid #CF9BCB"
                >
                </tc-range-slider>
            </div>


            {/* Year Label and Selected Values */}
            <div className="my-1">
                <h5 className="flex justify-between mb-1">Year: <span>{yearSliderV1}-{yearSliderV2}</span></h5>
            </div>
            {/* Year Slider */}
            <div className="my-1">
                <tc-range-slider
                    // Function Attributes //
                    id="YearSlider"
                    ref={ yearSliderRef }
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
                    slider-height="7px"
                    slider-bg-fill="#77042B"
                    slider-bg="#76877D"
                    pointer-width="20px"
                    pointer-height="20px"
                    pointer-radius="5px"
                    pointer-bg="#77042B"
                    pointer-bg-hover="#CF9BCB"
                    pointer-bg-focus="#CF9BCB"
                    pointer1-shadow-focus =	"0 0 20px #CF9BCB"
                    pointer2-shadow-focus =	"0 0 20px #CF9BCB"
                    pointer1-shadow-hover =	"0 0 20px #CF9BCB"
                    pointer2-shadow-hover =	"0 0 20px #CF9BCB"
                    pointer-border="1px solid black"
                    pointer-border-hover="2px solid #CF9BCB"
                    pointer-border-focus="2px solid #CF9BCB"
                >
                </tc-range-slider>
            </div>
        </div>
    )
}