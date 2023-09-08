import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';
import LoadingAnimation from '../loadingAnimation/LoadingAnimation';

export default function Table({ results }) {
  const [loader, setLoader] = useState(true);
  const [rows, setRows] = useState();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(results);
      setLoader(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

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

  const tableCustomStyles = {
    headRow: {
      style: {
        color: '#FFFFFF',
        backgroundColor: 'rgba(16, 69, 71, 1)',
      },
    },
  };

  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <DataTable
        columns={columns}
        data={rows}
        fixedHeader
        pagination
        highlightOnHover
        striped
        customStyles={tableCustomStyles}
        progressPending={loader}
        progressComponent={<LoadingAnimation />}
      />
    </StyleSheetManager>
  );
}
