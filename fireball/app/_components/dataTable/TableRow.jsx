import { flushSync } from 'react-dom';
import { useEffect } from 'react';

export default function TableRow({ nasaObj, setHoveredRow }) {
  const country = nasaObj.locationInfo?.country ? nasaObj.locationInfo.country : 'N/A'

  // When component is unmounted, remove highlighting
  useEffect(() => {
    return () => flushSync(() => setHoveredRow( prevState => ({...prevState, isHovered: false}) ) )
  }, [])
  return (
    <tr className='border-b border-slate-700' onMouseLeave={() => flushSync(() => setHoveredRow( prevState => ({...prevState, isHovered: false}) ) )} onMouseEnter={() => setHoveredRow( {country, isHovered: true} )}>
      <td className='px-4 py-2'>{nasaObj.name}</td>
      <td className='px-4 py-2'>
        {nasaObj.year ? new Date(nasaObj.year).getFullYear() : 'N/A'}
      </td>
      <td className='px-4 py-4'>{nasaObj.recclass}</td>
      <td className='px-4 py-4'>{nasaObj.mass ? nasaObj.mass : 'N/A'}</td>
      <td className='px-4 py-4'>
        {country}
      </td>
    </tr>
  );
}
