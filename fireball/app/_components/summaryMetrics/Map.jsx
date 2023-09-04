import * as d3 from "d3";
import { legendColor } from 'd3-svg-legend';
import { useEffect, useRef } from "react"
import geoJson from './countryGeoJson.json';

export default function Map({ width, height, results }) {
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
        // Any countries that are not in the data set but are in our geJson should be set as null so we know they have no data associated with them
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

    // When results updates recalucate fills/create map on first load
    useEffect(() => {
        const newMeteoritesPerCountry = {}
        // Create a country: strikeNum object made up of just the filtered data
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
        
        // Conver to n array where each element takes the form [country: "", numStrikes: _]
        // This format is necessary for use when mapping data to countries
        const meteoritesPerCountryArr = Object.entries(meteoritesPerCountry).map(([country, numStrikes]) => ({
            country,
            numStrikes
        }));
          
            
        // Maximun number of strikes used to set top of the domain
        const maxStrikes = Math.max(...Object.values(meteoritesPerCountry));

        // Create projection
        const projection = d3
            .geoEqualEarth()
            .scale(150)
            .center([80, -10])

        // Path generator function
        const geoPathGenerator = d3.geoPath().projection(projection);
        
        // Color scale and domain
        const color = d3.scaleSequential(d3.interpolatePuRd)
            .domain([0, maxStrikes == 0 ? 1 : maxStrikes])

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
            .attr("fill", elem => elem.numStrikes === null ? "lightgrey" : color(elem.numStrikes));
        
        paths.attr("fill", elem => elem.numStrikes === null ? "lightgrey" : color(elem.numStrikes));

        // set legend
        svg.append("g")
            .attr("class", "legendSequential")
            .attr("transform", "translate(20,250)")
            .attr("style","font-size: 0.5rem")

        const legendSequential = legendColor()
            .shapeWidth(15)
            .cells(5)
            .labelFormat("1.0f")
            .orient("vertical")
            .scale(color)
        
        svg.select(".legendSequential")
            .call(legendSequential);

    },[results])



    return (
        <>
            <svg ref={svgRef}  viewBox="0 0 650 400" width="100%" height="100%"  />
        </>
    );
}

