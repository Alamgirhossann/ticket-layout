import React from "react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as BiIcons from "react-icons/bi";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const url =
  "https://native-note-app-c6215-default-rtdb.firebaseio.com/student.json";

const Paginate = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [studentClass, setStudentClass] = useState("DEFAULT");
  const [searchBar, setSearchBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  let Navigate = useNavigate();
  const tableColumn = [
    {
      Header: "ACCOUNT",
      accessor: "account",
    },
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "CONTACT",
      accessor: "contact",
    },
    {
      Header: " IMAGE",
      accessor: "image",
      Cell: ({ row }) => (
        <img
          style={{ height: "50px", width: "50px" }}
          src={row.values.image}
          h={100}
        />
      ),
    },
    {
      // Header: "ACTION",
      accessor: "action",
      Cell: ({ row }) => (
        <React.Fragment>
          <div className="icons-center">
            <button className="icons">
              <AiIcons.AiOutlineShareAlt />
            </button>
            <button className="icons">
              <BsIcons.BsFillReplyFill />
            </button>
            <button className="icons">
              <MdIcons.MdAssignmentInd />
            </button>
            <button
              className="icons"
              onClick={() => {
                update(row.original.id);
              }}
            >
              <AiIcons.AiFillEdit />
            </button>
            <button
              className="icons"
              onClick={() => {
                deleteStudent(row.original.id);
              }}
            >
              <AiIcons.AiFillDelete />
            </button>
          </div>
        </React.Fragment>
      ),
    },
  ];


  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(url);
      console.log(typeof data)
      if (Object.keys(data).length !== 0) {
        const newData = [];
        Object.keys(data).forEach((items) => {
          console.log(data[items]);
          newData.push({
            id: items,
            ...data[items],
          });
        });
        setProducts(newData);
      } 
      else {
        setProducts([]);
      }

      // console.log(newData, typeof data);
    } 
    catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setStudentClass(e.target.value);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);

  const update = (id) => {
    Navigate(`/update/${id}`);
  };

  const deleteStudent = async (id) => {
    try {
      const res = await fetch(
        `https://native-note-app-c6215-default-rtdb.firebaseio.com/student/${id}.json`,
        {
          method: "DELETE",
        }
      );
      await res.json();
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const searchWithClass= async () =>{  
    if (studentClass ==="All") {
      fetchProducts()
    }else{
      const { data } = await axios.get(url);
      const newData = [];
      Object.keys(data).forEach((items) => {
        console.log(data[items]);
        newData.push({
          id: items,
          ...data[items],
        });
      });
      const filtered = newData.filter((emp) => emp.class === studentClass);
      // console.log(filtered);
      if (filtered.length === 0 ) {
        setErrorMessage(`No data found for class ${studentClass}`)
      }else{
        setErrorMessage('')
        setProducts(filtered)
      }
      
    } 
    
}

const createPDF = async () => {
  const pdf = new jsPDF("portrait", "pt", "a4");
  const data = await html2canvas(document.querySelector("#table"));
  const img = data.toDataURL("text/plain");
  const imgProperties = pdf.getImageProperties(img);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
  pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("shipping_label.pdf");
};


    const searchWithName= ()=>{   
    const filtered = products.filter((emp) => emp.name === input);
    // console.log(filtered);
    if (filtered.length === 0 ) {
      setErrorMessage(`No data found for name ${input}`)
    }else{
      setErrorMessage('')
      setProducts(filtered)
    }
}

  console.log(products);
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => products, [products]);
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

  const closeBtn = ()=>{
    setInput("")
    setErrorMessage('')
    setSearchBar(false)
    fetchProducts()
  }

  const openSearchBar=()=>{
    setStudentClass("DEFAULT")
    setErrorMessage('')
    setSearchBar(true)
  }

  

  if (Object.keys(products).length === 0)
    return (
      <div className="text-center">
          <h1 className="student-list">Student List</h1>
          <p>Data Not Found Please Add Data</p>
          <button className="add" onClick={() => Navigate("/infoForm")}>
            Add Student
          </button>
        </div>
    );

  return (
    <>
    <div>
    <div className={`${searchBar ? "d-block" : "d-none"}`}>
      <div className="input-box">
        <input
          className="select-item"
          type="text"
          value={input}
          placeholder="Search name"
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="close">
          <AiIcons.AiOutlineClose
            onClick={closeBtn}
          />
        </div>
        <div className="icons">
          <BsIcons.BsSearch onClick={searchWithName} />
        </div>
      </div>
      <h5 className="text-danger text-center">{errorMessage}</h5>
    </div>

    <div className={`${searchBar ? "d-none" : "d-block"}`}>
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-5">
              <h3 className="student-list">Student List</h3>
            </div>

            <div className="col-7 select-div">
              <select
                className="select-item"
                aria-label="Default select example"
                value={studentClass}
                onChange={handleChange}
                name="class"
              >
                <option value="DEFAULT" disabled>
                  select class
                </option>
                <option value="All">All Class</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
                <option value="5">Five</option>
                <option value="6">Six</option>
                <option value="7">Seven</option>
                <option value="8">Eight</option>
                <option value="9">Nine</option>
                <option value="10">Ten</option>
              </select>
              
              <div
                className="d-flex align-items-center"
                style={{ cursor: "pointer", marginLeft: "5px" }}
              >
                
                  <BsIcons.BsSearch onClick={searchWithClass}/>
                
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex justify-content-end">
            <button
              className="icons"
              onClick={() => Navigate("/infoForm")}
            >
              <MdIcons.MdAdd />
            </button>
            {
              // <button onClick={handleOpen}>Open modal</button>
          }
            <div className="icons">
              <BsIcons.BsSearch onClick={openSearchBar} />
            </div>
          </div>
        </div>
      </div>
      <h5 className="text-danger text-center">{errorMessage}</h5>
    </div>
    
  </div>
        <div className='table-container'>
          <table className="table" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th className="text-center"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
          <p style={{padding:"3px 5px 0 0", margin:"0"}}>Items Per Page:</p>
            <select
              style={{
                width:"70px",
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
        <div className="text-center">
        <button onClick={createPDF} className="mx-2 add">
                Download List
              </button>
        </div>
    </>
  );
};

export default Paginate;
