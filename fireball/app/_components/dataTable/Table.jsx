import TableRow from './TableRow';

export default function Table({ results }) {
  return (
    <main className='grid grid-cols-1 p-4'>
      <div className='table-container max-h-96 overflow-y-auto'>
        <table className='table-auto'>
          <thead className='sticky top-0 border border-slate-700 text-slate-700 bg-slate-100'>
            <tr>
              <th className='py-2 px-4 text-left'>Name</th>
              <th className='py-2 px-4 text-left'>Year</th>
              <th className='py-2 px-4 text-left'>Composition</th>
              <th className='py-2 px-4 text-left'>Mass</th>
              <th className='py-2 px-4 text-left'>Location</th>
            </tr>
          </thead>
          <tbody>
            {results.map((nasaObj, i) => (
              <TableRow key={i} nasaObj={nasaObj} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}