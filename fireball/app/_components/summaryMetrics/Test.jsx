import * as d3 from "d3";
import { useEffect, useRef } from "react"
import geoJson from './countryGeoJson.json';

export default function Test({ width, height, results }) {
    const { current: meteoritesPerCountry } = useRef({});
    const svgRef = useRef();

    useEffect(() => {

        results.forEach(elem =>  {
            if ('locationInfo' in elem) {
                const country = elem.locationInfo.country;
                if (country) {
                    meteoritesPerCountry[country] = 0;
                }
            }
        })

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
            meteoritesPerCountry[key] = newMeteoritesPerCountry[key] || 0;
        }

        const meteoritesPerCountryArr = Object.entries(meteoritesPerCountry).map(([country, numStrikes]) => ({
            country,
            numStrikes
          }));
          
          
            
        // Maximun number of strikes used to set top of the domain
        const maxStrikes = Math.max(...Object.values(meteoritesPerCountry));

        const projection = d3
            .geoEqualEarth()
            .scale(150)
            .center([90, -15])

        const geoPathGenerator = d3.geoPath().projection(projection);
        
        // Color scale and domain
        const color = d3.scaleSequential(d3.interpolatePuRd)
            .domain([0, maxStrikes == 0 ? 1 : maxStrikes])
        const svg = d3.select(svgRef.current);

        const paths = svg.selectAll("path")
            .data(Object.values(meteoritesPerCountryArr, elem => elem.country))
            
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
            .attr("stroke", "darkGrey")
            .attr("stroke-width", 1)
            .attr("fill", elem => color(elem.numStrikes));

        paths.attr("fill", elem => {

            color(elem.numStrikes)
        });

    },[results])



    return (
        <>
            <svg ref={svgRef}  viewBox="0 0 650 400" width="100%" height="100%" className="border border-slate-700" />
        </>
    );
}

