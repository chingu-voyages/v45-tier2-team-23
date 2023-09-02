import * as d3 from "d3";
import { useEffect, useRef } from "react"
import geoJson from './countryGeoJson.json';

export default function Choropleth({ width, height, results }) {
    const { current: meteoritesPerCountry } = useRef({});

    // On initial load populate meteoritesPerCountry as a country: numStrikes object with 0 values for all existing countries 
    useEffect(() => {
        results.forEach(elem =>  {
            if ('locationInfo' in elem) {
                const country = elem.locationInfo.country;
                if (country) {
                    meteoritesPerCountry[country] = 0;
                }
            }
        })
        
    },[]);
    
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
        
    // Maximun number of strikes used to set top of the domain
    const maxStrikes = Math.max(...Object.values(meteoritesPerCountry));
    
    // Color scale and domain
    const color = d3.scaleSequential(d3.interpolatePuRd)
        .domain([0, maxStrikes])
        
    // Projection type and sizing/positioning
    const projection = d3
        .geoEqualEarth()
        .scale(125)
        .center([90, -15])
        
    // Instantiates path generator function
    const geoPathGenerator = d3.geoPath().projection(projection);

    // Map over each geoJson feature and bind color and country to each other.
    const allSvgPaths = geoJson.features.map((shape) => {
        // If the country that we are creating the path for exists in our data set grab the number of strikes associated with it, else give it a null value
        const numStrikes = shape.properties.name in meteoritesPerCountry ? meteoritesPerCountry[shape.properties.name] : null;
        return (
        <path
            key={shape.properties.name}
            d={geoPathGenerator(shape)}
            stroke="darkGrey"
            strokeWidth={0.5}
            fill={numStrikes == null ? "lightgrey" : color(numStrikes)}
            fillOpacity={1}
        />
        );
    });

    return (
        <svg viewBox="0 0 650 400" width='100%' height='100%' style={{border: '1px solid black'}}>
            {allSvgPaths}
        </svg>
    );
}

