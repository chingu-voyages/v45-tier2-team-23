import * as d3 from "d3";
import { legendColor } from 'd3-svg-legend';
import { useEffect, useState, useRef } from "react"
import geoJson from './countryGeoJson.json';
import './Map.css';

export default function Map({ results, hoveredRow }) {
    const [chartType, setChartType] = useState("totalStrikes");
    const { current: countryMeteoriteInfo } = useRef({});
    const svgRef = useRef();
    let paths


    // On initial load create an object that corresponds to all countries in results and give them an initial value of 0
    // { country: 0 }
    useEffect(() => {
        results.forEach(elem =>  {
            if ('locationInfo' in elem) {
                const country = elem.locationInfo.country;
                if (country) {
                    countryMeteoriteInfo[country] = 0;
                }
            }
        })
        // Any countries that are not in the data set but are in our geoJson should be set as null so we know they have no data associated with them
        geoJson.features.forEach(feature => { 
            if ('properties' in feature) {
                if ('name' in feature.properties) {
                    if (!countryMeteoriteInfo.hasOwnProperty(feature.properties.name)) {
                        countryMeteoriteInfo[feature.properties.name] = null
                    }
                }
            }
            
        });
    },[])

    // When results updates, recalculate and fill/create map on first load
    useEffect(() => {
        
        // Similar to CountryMeteoriteInfo, but has a value set to each country which will be avgerage mass per country or strikes per country depending on the chartType
        // chartType === totalStrikes { country: numStrikes}
        // chartType === avgMass { country: avgMass}
        let filteredCountryMeteoriteInfo = {}
        
        filteredCountryMeteoriteInfo = filterResults(results,chartType);
            
        // Update the value of countries in countryMeteoriteInfo to accurately reflect the updated results.
        for ( let key in countryMeteoriteInfo ) {
            if (countryMeteoriteInfo[key] !== null) {
                countryMeteoriteInfo[key] = filteredCountryMeteoriteInfo[key] || 0;
            }
        }

        // Conver to an array where each element takes the form [country: "", countryStrikeInfo: _]
        // This format is necessary for use when mapping data to countries
        const countryMeteoriteInfoArr = Object.entries(countryMeteoriteInfo).map(([country, countryStrikeInfo]) => ({
            country,
            countryStrikeInfo
        }));
        
        // Maximum number of strikes or maximum average mass used to set top of the domain
        const maxDomain = Math.max(...Object.values(countryMeteoriteInfo)) || 1;
        
        // Create projection
        const projection = d3
            .geoEqualEarth()
            .scale(150)
            .center([80, -10])

        // Path generator function
        const geoPathGenerator = d3.geoPath().projection(projection);
        // Color scale and domain
        const domain = [0,chartType === "totalStrikes" && maxDomain <= 5 ? 5 : maxDomain];
        const color = d3.scaleSequential(d3.interpolatePuRd)
            .domain(domain)
        // Grab the SVG element
        const svg = d3.select(svgRef.current);

        // Select all paths and bind data
        paths = svg.selectAll("path")
            .data(Object.values(countryMeteoriteInfoArr, elem => elem.country))
        //Create tooltip
        const tooltip = d3
            .select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        
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
        
        // Update fill color when data changes
        paths.attr("fill", elem => elem.countryStrikeInfo === null ? "lightgrey" : elem.countryStrikeInfo === 0 ? "#f9f9f9" : color(elem.countryStrikeInfo));

        paths
            .on('mouseover', (e, d) => {
                tooltip.transition().duration(200).style('opacity', 0.9);
                tooltip
                .html(
                    chartType === 'totalStrikes'
                    ? `Country: ${d.country}<br/>Meteorite Strikes: ${
                        d.countryStrikeInfo ? d.countryStrikeInfo : 'N/A'
                        }`
                    : `Country: ${d.country}<br/>Average Mass: ${
                        Math.round(d.countryStrikeInfo) ? Math.round(d.countryStrikeInfo) : 'N/A'
                        }`
                )
                .style('left', e.pageX + 'px')
                .style('top', e.pageY - 28 + 'px');
            })
            .on('mouseout', (d) => {
                tooltip.transition().duration(500).style('opacity', 0);
            });

        // Select the country who's row is currently being hovered on in the table.
        const selectedPath = hoveredRow && paths.filter((d) => d.country === hoveredRow.country);
        // Highlight/unhighlight the country
        selectedPath && selectedPath.classed("stroke-accent stroke-1",hoveredRow.isHovered)

        
        // set legend
        svg.append("g")
            .attr("class", "legendSequential")
            .attr("transform", "translate(20,200)")
            .attr("style","font-size: 0.5rem")

        const legendSequential = legendColor()
            .shapeWidth(15)
            .cells(getCells(maxDomain,chartType))
            .title(chartType === "avgMass" ? "kgs" : "meteorites")
            .labelFormat(getLabelFormat(maxDomain,chartType))
            .orient("vertical")
            .scale(color)
        
        svg.select(".legendSequential")
            .call(legendSequential);


    },[results,chartType,hoveredRow])

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

// Returns the cells that will be rendered by the legend
function getCells(maxDomain, chartType) {
    const cells = [0, maxDomain * 0.1, maxDomain * 0.25, maxDomain * 0.5, maxDomain * 0.75, maxDomain];
    if (chartType === "totalStrikes") {
        if (maxDomain <= 5) {
            return [0,1,2,3,4,5]
        } 
        else if (maxDomain <= 25) {
            return cells
        }
        else if (maxDomain <= 50) {
            return cells.map(elem => Math.round(elem / 5) * 5);
        }
        
        return cells.map(elem => Math.round(elem / 10) * 10)
    } else {
        return maxDomain > 100 ? cells.map(elem => Math.round(elem / 10) * 10) : cells;
    }
}

// function getCells(maxDomain, chartType) {
//     const cells = chartType === "totalStrikes" && maxDomain <= 5 ? [0,1,2,3,4,5] : [0, maxDomain * 0.1, maxDomain * 0.25, maxDomain * 0.5, maxDomain * 0.75, maxDomain];

//     const roundedCells = maxDomain > 100 ? cells.map(elem => Math.round(elem / 10) * 10) : cells;

//     return roundedCells;
// }

// Formats the legend's label to have different precision levels as the domain shifts
function getLabelFormat(maxDomain, chartType) {
    if (chartType === "avgMass") {
        if (maxDomain <= 1) {
            return ".3f";
        } else if (maxDomain <= 10) {
            return ".2f";
        } else if (maxDomain <= 100) {
            return ".1f";
        }
    }

    return "1.0f";
}


// creates a { country: info } object where info can either be avgMass or strikeNum
function filterResults (results, chartType) {
    // Create a { country: strikeNum } object made up of just the filtered data
    const newMeteoriteInfo = {}
    results.forEach(elem =>  {
        if ('locationInfo' in elem) {
            const country = elem.locationInfo.country;
            if (country) {
                if (chartType === "avgMass") {
                    if (newMeteoriteInfo[country]) {
                        if (elem.mass) {
                            newMeteoriteInfo[country] += Number(elem.mass)/1000; // Converts grams to kgs
                        }
                    } else {
                        if (elem.mass) {
                            newMeteoriteInfo[country] = Number(elem.mass)/1000; // Converts grams to kgs
                        }
                    }
                } else {  
                    if (newMeteoriteInfo[country]) {
                        newMeteoriteInfo[country] += 1;
                    } else {
                        newMeteoriteInfo[country] = 1;
                    }
                }
            }
        }
    })
    return newMeteoriteInfo
}