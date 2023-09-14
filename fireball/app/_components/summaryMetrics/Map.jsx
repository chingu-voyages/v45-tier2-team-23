import * as d3 from "d3";
import { legendColor } from 'd3-svg-legend';
import { useEffect, useState, useRef } from "react"
import geoJson from './countryGeoJson.json';
import '../../globals.css';

export default function Map({ results, selectedRow }) {
    const [chartType, setChartType] = useState("totalStrikes");
    const { current: countryMeteoriteInfo } = useRef({});
    const svgRef = useRef();
    let maxMassRef = useRef(0);


    // On initial load create an object that corresponds to all countries in results and give them an initial value of 0
    // { country: 0 }
    useEffect(() => {
        results.forEach(elem =>  {
            maxMassRef.current = elem.mass ? Math.max(Number(elem.mass), maxMassRef.current) : 0;

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
        const paths = svg.selectAll("path")
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
            .attr("fill", elem => elem.countryStrikeInfo === null ? "lightgrey" : elem.countryStrikeInfo === 0 ? "#f9f9f9" : color(elem.countryStrikeInfo))
            .on('mouseover', (e, d) => {
                tooltip.transition().duration(200).style('opacity', 0.9);
                tooltip
                    .html(
                        chartType === 'totalStrikes'
                        ? `Country: ${d.country}<br/>Meteorite Strikes: ${
                            d.countryStrikeInfo ? d.countryStrikeInfo : 'N/A'
                            }`
                        : `Country: ${d.country}<br/>Average Mass: ${
                            d.countryStrikeInfo ? parseFloat(d.countryStrikeInfo.toFixed(3)) : 'N/A'
                            }`
                    )
                    .style('left', e.pageX + 'px')
                    .style('top', e.pageY - 28 + 'px');
                })
                .on('mouseout', (d) => {
                    tooltip.transition().duration(500).style('opacity', 0);
                });

        paths.on('mouseover', (e, d) => {
            tooltip.transition().duration(200).style('opacity', 0.9);
            tooltip
                .html(
                    chartType === 'totalStrikes'
                    ? `Country: ${d.country}<br/>Meteorite Strikes: ${
                        d.countryStrikeInfo ? d.countryStrikeInfo : 'N/A'
                        }`
                    : `Country: ${d.country}<br/>Average Mass: ${
                        d.countryStrikeInfo ? parseFloat(d.countryStrikeInfo.toFixed(3)) : 'N/A'
                        }`
                )
                .style('left', e.pageX + 'px')
                .style('top', e.pageY - 28 + 'px');
            })
            .on('mouseout', (d) => {
                tooltip.transition().duration(500).style('opacity', 0);
            });

        
        // Update fill color when data changes
        paths.attr("fill", elem => elem.countryStrikeInfo === null ? "lightgrey" : elem.countryStrikeInfo === 0 ? "#f9f9f9" : color(elem.countryStrikeInfo));

        // remove previously plotted strike 
        svg.select("circle#tempCircle").remove();
        svg.select("circle#tempDot").remove();
        //svg.select("path#tempHighlight").classed("stroke-accent stroke-1",false).attr("id",null)
        svg.select("path#tempHighlight").remove();

        // Display the country and position/mass of selected row from data table
        if (selectedRow) {
            
            // Scale for mass circles
            const strikeMassScale = d3.scaleSqrt()
                .domain([0,maxMassRef.current])
                .range([0,500])

            // Select the country who's row is currently selected in the table.
            const selectedPath = paths.filter((d) => d.country === selectedRow.country);

            // Highlight/unhighlight the country
            svg
                .append("path")
                .attr("d", geoPathGenerator(geoJson.features.find(feature => { 
                    if ('properties' in feature) {
                        if ('name' in feature.properties) {
                            return feature.properties.name === selectedRow.country
                        }
                    }
                })))

                .attr("fill-opacity", 0.25)
                .classed("stroke-accent stroke-[0.5]", true)
                .attr("id","tempHighlight");
                
            if (selectedRow.coordinates[0]) {
                // Plot coordinates and size of strike on map based on the mass size of the row that is selected in table
                const xyStrikePosition = projection(selectedRow.coordinates)

                svg
                    .append("circle")
                    .attr("cx", xyStrikePosition[0])
                    .attr("cy", xyStrikePosition[1])
                    .attr("r", strikeMassScale(selectedRow?.mass))
                    .attr("id", "tempCircle") 
                    .classed("stroke-accent stroke-[0.5]", true)
                    .attr("fill-opacity", "0.3");
                    
                svg
                    .append("circle")
                    .attr("cx", xyStrikePosition[0])
                    .attr("cy", xyStrikePosition[1])
                    .attr("r", 2)
                    .attr("id", "tempDot")
            }
        }

        
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


    },[results,chartType,selectedRow])

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
                    className="me-2"
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
                    className="me-2"
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