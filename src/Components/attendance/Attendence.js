import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import axios from "axios";
import { useTable, useSortBy, usePagination } from "react-table";

const Attendence = () => {
  const url =
    "https://native-note-app-c6215-default-rtdb.firebaseio.com/attendence.json";

  const tableColumn = [
    {
      Header: "Account No",
      accessor: "accountNo",
    },
    {
      Header: "Machine No",
      accessor: "machineNumber",
    },
    {
      Header: "User Name",
      accessor: "userName",
    },
    {
      Header: "Date Time",
      accessor: "dateTime",
    },
  ];
  const [attendance, setAttendance] = useState([]);
  let Navigate = useNavigate();

  console.log(attendance);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(url);
      console.log(typeof data);
      if (Object.keys(data).length !== 0) {
        const newData = [];
        Object.keys(data).forEach((items) => {
          console.log(data[items]);
          newData.push({
            id: items,
            ...data[items],
          });
        });
        setAttendance(newData);
      } else {
        setAttendance([]);
      }

      // console.log(newData, typeof data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => attendance, [attendance]);
  console.log(data, columns);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    row,
    canPreviousPage,
    canNextPage,
    previousPage,
    prepareRow,
    gotoPage,
    nextPage,
    pageCount,
    pageOptions,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="student-home-container" style={{ marginTop: "80px", paddingBottom:"20px"}}>
      <div className="d-flex justify-content-between">
        <h1 className="student-list">Attendance List</h1>
        <div className="flex-top">
          <button className="icons" onClick={() => Navigate("/attendanceForm")}>
            <MdIcons.MdAdd />
          </button>
        </div>
      </div>

      {attendance !== null || undefined ? (
        <div>
          <div>
            <div className="table-container">
              <table className="table" {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          className="text-center"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                          {}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row, i) => {
                    prepareRow(row);

                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>
                            {" "}
                            <div className="items-center">
                              {cell.render("Cell")}
                            </div>{" "}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="d-flex justify-content-end">
                {
                  // <div className="d-felx"></div>
                }
                <p style={{ padding: "3px 5px 0 0", margin: "0" }}>
                  Items Per Page:
                </p>
                <select
                  style={{
                    width: "70px",
                    marginRight: "50px",
                    border: "none",
                    borderBottom: "1px solid black",
                    outline: "none",
                    background: "none",
                  }}
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[5, 10, 20, 30].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
                <span className="d-flex align-items-center me-5">
                  Page&nbsp;
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{" "}
                </span>
                <div>
                  <button
                    className="icons"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    <BiIcons.BiFirstPage className="page-controller" />
                  </button>{" "}
                  <button
                    className="icons"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    <MdIcons.MdKeyboardArrowLeft className="page-controller" />
                  </button>{" "}
                  <button
                    className="icons"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    <MdIcons.MdKeyboardArrowRight className="page-controller" />
                  </button>{" "}
                  <button
                    className="icons"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    <BiIcons.BiLastPage className="page-controller" />
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>Data Not Found Please Add Data</p>
          <button className="add" onClick={() => Navigate("/attendanceForm")}>
            Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default Attendence;
