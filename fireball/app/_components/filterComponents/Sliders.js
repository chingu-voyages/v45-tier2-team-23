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
        <div className="flex flex-col justify-center ms-2 ">
            {/* Mass Label and Selected Values */}
            <div className="my-1 " >
                <h5 className="mx-2 mt-4 ">Filter Mass Range</h5>
                <p className="mx-2">Start: {massSliderV1}</p>
                <p className="mx-2">End: {massSliderV2}</p>
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
                    slider-width="150px"
                    slider-height="5px"
                    pointer-width="10px"
                    pointer-height="20px"
                    pointer-radius="5px"
                    pointer-bg="#334155"
                    pointer-bg-hover="yellow"
                    pointer-bg-focus="yellow"
                    slider-bg-fill="red"
                    pointer1-shadow-focus =	"0 0 20px yellow"
                    pointer2-shadow-focus =	"0 0 20px yellow"
                    pointer1-shadow-hover =	"0 0 20px yellow"
                    pointer2-shadow-hover =	"0 0 20px yellow"
                    pointer-border="1px solid black"
                    pointer-border-hover="2px solid yellow"
                    pointer-border-focus="2px solid yellow"
                >
                </tc-range-slider>
            </div>


            {/* Year Label and Selected Values */}
            <div className="my-1">
                <h5 className="mx-2 mt-4">Filter Year Range</h5>
                <p className="mx-2">Start : &nbsp;{yearSliderV1}</p>
                <p className="mx-2">End : {yearSliderV2}</p>
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
                    step="5"
                    value1="500"
                    value2="2023"
                    round="0"
                    min="500" 
                    max="2023" 
                    // Style Attributes //
                    slider-width="150px"
                    slider-height="5px"
                    pointer-width="10px"
                    pointer-height="20px"
                    pointer-radius="5px"
                    pointer-bg="#334155"
                    pointer-bg-hover="yellow"
                    pointer-bg-focus="yellow"
                    slider-bg-fill="red"
                    pointer1-shadow-focus =	"0 0 20px yellow"
                    pointer2-shadow-focus =	"0 0 20px yellow"
                    pointer1-shadow-hover =	"0 0 20px yellow"
                    pointer2-shadow-hover =	"0 0 20px yellow"
                    pointer-border="1px solid black"
                    pointer-border-hover="2px solid yellow"
                    pointer-border-focus="2px solid yellow"
                >
                </tc-range-slider>
            </div>
        </div>
    )
}