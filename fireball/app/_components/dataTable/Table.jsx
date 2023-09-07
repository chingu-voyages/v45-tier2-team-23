import React from 'react';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { StyleSheetManager } from 'styled-components';

export default function Table({ results }) {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) {
    return <div>Loading...</div>;
  }

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
      selector: (row) => row.mass || 'N/A',
      sortable: true,
    },
    {
      name: 'Location',
      selector: (row) => row.locationInfo?.country || 'N/A',
      sortable: true,
    },
  ];

  const shouldForwardProp = (prop) => !prop.startsWith('$');

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <DataTable columns={columns} data={results} fixedHeader pagination />
    </StyleSheetManager>
  );
}
