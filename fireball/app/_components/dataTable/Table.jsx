import DataTable from 'react-data-table-component';

export default function Table2({ results }) {
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Year',
      selector: (row) => {
        if (row.year) {
          return row.year.substring(0, 4);
        }
        return 'N/A';
      },
      sortable: true,
    },
    {
      name: 'Composition',
      selector: (row) => row.recclass,
      sortable: true,
    },
    {
      name: 'Mass',
      selector: (row) => row.mass ?? 'N/A',
      sortable: true,
    },
    {
      name: 'Location',
      selector: (row) => row.locationInfo?.country ?? 'N/A',
      sortable: true,
    },
  ];
  return (
    <DataTable
      // title='Meteorite Strikes'
      columns={columns}
      data={results}
      fixedHeader
      pagination
    ></DataTable>
  );
}
