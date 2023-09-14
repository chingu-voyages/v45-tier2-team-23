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
      name: <div className="group relative w-max">Name
              <div className="bg-black border border-[#ccc] rounded p-2 text-xs text-white shadow-[2px_2px_2px_rgba(0,0,0,0.3)] pointer-events-none absolute -top-10 lg:-top-10 -translate-x-1/4 lg:-translate-x-1/2 left-1/2 w-max opacity-0 transition-opacity group-hover:opacity-90">
                Name of the meteorite, based on where it was found.
              </div>
            </div>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <div className="group relative w-max">Year
              <div className="bg-black border border-[#ccc] rounded p-2 text-xs text-white shadow-[2px_2px_2px_rgba(0,0,0,0.3)] pointer-events-none absolute -top-10 -translate-x-1/2 left-1/2 w-max opacity-0 transition-opacity group-hover:opacity-90">
                The year that the meteorite fell.
              </div>
            </div>,
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
      name: <div className="group relative w-max">Composition
              <div className="bg-black border border-[#ccc] rounded p-2 text-xs text-white shadow-[2px_2px_2px_rgba(0,0,0,0.3)] pointer-events-none absolute -top-10 -translate-x-1/2 left-1/2 w-max opacity-0 transition-opacity group-hover:opacity-90">
                Classification of meteorite, by mineral type etc...
              </div>
            </div>,
      selector: (row) => row.recclass,
      sortable: true,
    },
    {
      name: <div className="group relative w-max">Mass
              <div className="bg-black border border-[#ccc] rounded p-2 text-xs text-white shadow-[2px_2px_2px_rgba(0,0,0,0.3)] pointer-events-none absolute -top-10 -translate-x-3/4 lg:-translate-x-1/2 left-1/2 w-max opacity-0 transition-opacity group-hover:opacity-90">
                The weight of the meteorite, in kgs.
              </div>
            </div>,
      selector: (row) => row.mass || "N/A",
      sortable: true,
      sortFunction: massSort
    },
    {
      name: <div className="group relative w-max">Location
              <div className="bg-black border border-[#ccc] rounded p-2 text-xs text-white shadow-[2px_2px_2px_rgba(0,0,0,0.3)] pointer-events-none absolute -top-10 -translate-x-3/4 lg:-translate-x-1/2 left-1/2 w-max opacity-0 transition-opacity group-hover:opacity-90">
                Country where the meteorite fell.
              </div>
            </div>,
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
