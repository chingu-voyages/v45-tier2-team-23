export default function TableRow({ nasaObj }) {
  return (
    <tr className='border border-slate-700'>
      <td className='px-4 py-2'>{nasaObj.name}</td>
      <td className='px-4 py-2'>
        {nasaObj.year ? new Date(nasaObj.year).getFullYear() : 'N/A'}
      </td>
      <td className='px-4 py-4'>{nasaObj.recclass}</td>
      <td className='px-4 py-4'>{nasaObj.mass ? nasaObj.mass : 'N/A'}</td>
      <td className='px-4 py-4'>
        {nasaObj.locationInfo?.country ? nasaObj.locationInfo.country : 'N/A'}
      </td>
    </tr>
  );
}
