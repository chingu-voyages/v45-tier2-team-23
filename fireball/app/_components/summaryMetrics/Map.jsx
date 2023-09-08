import * as d3 from "d3";
import { legendColor } from 'd3-svg-legend';
import { useEffect, useState, useRef } from "react"
import geoJson from './countryGeoJson.json';

export default function Map({ results }) {
    const [chartType, setChartType] = useState("totalStrikes");
    const { current: meteoritesPerCountry } = useRef({});
    const svgRef = useRef();
    
    // On initial load create an object that corresponds to all countries in results and give them an initial value of 0
    useEffect(() => {
        results.forEach(elem =>  {
            if ('locationInfo' in elem) {
                const country = elem.locationInfo.country;
                if (country) {
                    meteoritesPerCountry[country] = 0;
                }
            }
        })
        // Any countries that are not in the data set but are in our geoJson should be set as null so we know they have no data associated with them
        geoJson.features.forEach(feature => { 
            if ('properties' in feature) {
                if ('name' in feature.properties) {
                    if (!meteoritesPerCountry.hasOwnProperty(feature.properties.name)) {
                        meteoritesPerCountry[feature.properties.name] = null
                    }
                }
            }
            
        });
    },[])

    // When results updates, recalculate and fill/create map on first load
    useEffect(() => {
        
        if (chartType === "totalStrikes") {
            // Create a country: strikeNum object made up of just the filtered data
            const newMeteoritesPerCountry = {}
            results.forEach(elem =>  {
                if ('locationInfo' in elem) {
                    const country = elem.locationInfo.country;
                    if (country) {
                        if (newMeteoritesPerCountry[country]) {
                            newMeteoritesPerCountry[country] += 1;
                        } else {
                            newMeteoritesPerCountry[country] = 1;
                        }
                    }
                }
            })

            
            // Update strikeNum in meteoritesPerCountry with new values
            for ( let key in meteoritesPerCountry ) {
                if (meteoritesPerCountry[key] !== null) {
                    meteoritesPerCountry[key] = newMeteoritesPerCountry[key] || 0;
                }
            }

        }
        else {
            const avgMassPerCountry = {}
            results.forEach(elem => {
                if ('locationInfo' in elem) {
                    const country = elem.locationInfo.country;
                    if (country) {
                        if (avgMassPerCountry[country]) {
                                if (elem.mass) {
                                    avgMassPerCountry[country] += Number(elem.mass)/1000;
                                }
                        } else {
                            if (elem.mass) {
                                avgMassPerCountry[country] = Number(elem.mass)/1000;
                            }
                        }
                    }
                }
            })
  
        
            for ( let key in meteoritesPerCountry ) {
                if (meteoritesPerCountry[key] !== null) {
                    meteoritesPerCountry[key] = avgMassPerCountry[key] || 0;
                }
            }

        } 
        
        // Conver to an array where each element takes the form [country: "", countryStrikeInfo: _]
        // This format is necessary for use when mapping data to countries
        const meteoritesPerCountryArr = Object.entries(meteoritesPerCountry).map(([country, countryStrikeInfo]) => ({
            country,
            countryStrikeInfo
        }));
        
        // Maximun number of strikes or maximum average mass used to set top of the domain
        const max = Math.max(...Object.values(meteoritesPerCountry));
        const min = Math.min(...Object.values(meteoritesPerCountry));
        
        // Create projection
        const projection = d3
            .geoEqualEarth()
            .scale(150)
            .center([80, -10])

        // Path generator function
        const geoPathGenerator = d3.geoPath().projection(projection);
        console.log("max:", max)
        // Color scale and domain
        const color = d3.scaleSequential(d3.interpolatePuRd)
            .domain([0, max == 0 ? 1 : max])
        console.log(meteoritesPerCountryArr)
        console.log(color(2))
        // Grab the SVG element
        const svg = d3.select(svgRef.current);

        // Select all paths and bind data
        const paths = svg.selectAll("path")
            .data(Object.values(meteoritesPerCountryArr, elem => elem.country))
        
        // update/create paths
        paths
            .enter()
            .append("path")
            .attr("d", elem => geoPathGenerator(geoJson.features.find(feature => { 
                if ('properties' in feature) {
                    if ('name' in feature.properties) {
                        return feature.properties.name === elem.country
                    }
                }
            })))
            .attr("stroke", "lightgrey")
            .attr("stroke-width", 0.3)
            .attr("fill", elem => elem.countryStrikeInfo === null ? "lightgrey" : elem.countryStrikeInfo === 0 ? "#f9f9f9" : color(elem.countryStrikeInfo));
        
        paths.attr("fill", elem => elem.countryStrikeInfo === null ? "lightgrey" : elem.countryStrikeInfo === 0 ? "#f9f9f9" : color(elem.countryStrikeInfo));

        // set legend
        svg.append("g")
            .attr("class", "legendSequential")
            .attr("transform", "translate(20,200)")
            .attr("style","font-size: 0.5rem")

        const legendSequential = legendColor()
            .shapeWidth(15)
            .cells(getCells(max))
            .title(chartType === "avgMass" ? "kgs" : "meteorites")
            .labelFormat((chartType === "avgMass" && max < 100) ? ".2f" : "1.0f")
            .orient("vertical")
            .scale(color)
        
        svg.select(".legendSequential")
            .call(legendSequential);

    },[results,chartType])



    return (
        <>
            <svg ref={svgRef}  viewBox="0 0 650 400" width="100%" height="100%"  />
            <form className="flex items-center justify-center gap-2">
                <label>
                <input
                    type="radio"
                    name="option"
                    value="totalStrikes"
                    checked={chartType === "totalStrikes"} // Check based on chartType value
                    onChange={() => setChartType("totalStrikes")}
                />
                Total strikes
                </label>
                <label>
                <input
                    type="radio"
                    name="option"
                    value="avgMass"
                    checked={chartType === "avgMass"} // Check based on chartType value
                    onChange={() => setChartType("avgMass")}
                />
                Average strike mass
                </label>
            </form>
        </>
    );
}

function getCells(max) {
    const cells = max === 0 ? [0] : [0,max*0.1, max*0.25, max*0.5, max*0.75, max]; 
    
    
    return max > 100 
        ? cells.map(elem => Math.round(elem/10)*10)
        :  cells;
}