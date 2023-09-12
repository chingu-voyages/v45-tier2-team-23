import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";

export default function Table({ results, setClickedRow }) {
  const [loader, setLoader] = useState(true);
  const [rows, setRows] = useState();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(results);
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
          return row.year.substring(0, 4);
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
        backgroundColor: "rgba(16, 69, 71, 1)",
      },
    },
  };

  const paginationComponentOptions = {
    noRowsPerPage: true,
  };

  const handleRowClick = (row) => {
    const coordinates = [row.reclong, row.reclat];
    const country = row?.locationInfo?.country;
    const mass = row?.mass;
    console.log({ coordinates, country, mass})
    setClickedRow({ coordinates, country, mass})
  }

  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <DataTable
        className="pt-2"
        columns={columns}
        data={rows}
        striped
        dense
        fixedHeader
        pagination
        highlightOnHover
        customStyles={tableCustomStyles}
        progressPending={loader}
        progressComponent={<LoadingAnimation />}
        paginationComponentOptions={paginationComponentOptions}
        onRowClicked={handleRowClick}
      />
    </StyleSheetManager>
  );
}
