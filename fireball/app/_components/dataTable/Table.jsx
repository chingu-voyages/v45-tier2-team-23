import TableRow from './TableRow';

export default function Table({ results, setHoveredRow }) {
  return (
    <div className='text-sm border border-slate-700 h-[400px] overflow-y-auto'>
      <table className='table-fixed w-full'>
        <thead className='sticky top-0 text-slate-700 bg-slate-100 w-full'>
          <tr>
            <th className='py-2 px-4 text-left'>Name</th>
            <th className='py-2 px-4 text-left'>Year</th>
            <th className='py-2 px-4 text-left'>Composition</th>
            <th className='py-2 px-4 text-left'>Mass</th>
            <th className='py-2 px-4 text-left'>Location</th>
          </tr>
        </thead>
        <tbody className='w-full'>
          {results.map((nasaObj, i) => (
            <TableRow key={i} nasaObj={nasaObj} setHoveredRow={setHoveredRow} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
