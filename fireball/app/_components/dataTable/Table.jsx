import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";
import '../../globals.css';

export default function Table({ results, setSelectedRow }) {
  const [loader, setLoader] = useState(true);
  const [rows, setRows] = useState();

  useEffect(() => {
    setRows(results);
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [results]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => {
        if (row.year) {
          const year = new Date(row.year);
          return year.getFullYear().toString();
        }
        return "N/A";
      },
      sortable: true,
    },
    {
      name: "Composition",
      selector: (row) => row.recclass,
      sortable: true,
    },
    {
      name: "Mass",
      selector: (row) => row.mass || "N/A",
      sortable: true,
      sortFunction: massSort
    },
    {
      name: "Location",
      selector: (row) => row.locationInfo?.country || "N/A",
      sortable: true,
    },
  ];

  const tableCustomStyles = {
    headRow: {
      style: {
        color: "#FFFFFF",
        backgroundColor: "rgba(16, 69, 71, 1)"
      },
    }
  };

  const paginationComponentOptions = {
    noRowsPerPage: true,
  };

  const handleRowSelect = (row) => {
    const coordinates = [row.reclong, row.reclat];
    const country = row?.locationInfo?.country;
    const mass = row?.mass;
    setSelectedRow({ coordinates, country, mass, isSelected: true})
  }

  const handleRowUnselect = (row) => {
    setSelectedRow()
  }


  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <DataTable
        className="pt-2"
        columns={columns}
        data={rows}
        striped
        fixedHeader
        pagination
        highlightOnHover
        customStyles={tableCustomStyles}
        progressPending={loader}
        progressComponent={<LoadingAnimation />}
        paginationComponentOptions={paginationComponentOptions}
        onRowClicked={handleRowSelect}
        onRowMouseEnter={handleRowSelect}
        onRowMouseLeave={handleRowUnselect}
      />
    </StyleSheetManager>
  );
}


const massSort = (rowA, rowB) => {

  const a = Number(rowA.mass) || -1;
  const b = Number(rowB.mass) || -1;

  if (a > b) {
    return 1;
  }

  if (b > a) {
      return -1;
  }

  return 0;
}
