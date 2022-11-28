import React from "react";
import Header from "./Common/Header";
import Sidebar from "./Common/Sidebar";
import { BsPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { remove } from "../redux/postReducer/PostTrainer";
const Table = ({ data, column }) => {

    const dispatch = useDispatch();

    const handleRemove = (Id) => {
        dispatch(remove(Id));
      };
  return (
    <>
    <Header />
    <div className='page'>
      <Sidebar />
      <div className="rightsidedata">
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <>



          
          <div className="tableOuter">


            
      <table>
        <thead>
          <tr>
            {column.map((header) => (
              <th>{header.header} </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <div>
            <tr key={row.id}>
              {column.map((col) => (
                <td key={col.id}>{row[col.field]}</td>
              ))}
            </tr>
            <tr onClick={() => handleRemove(row._id)}>delete</tr>
            </div>
          ))}
        </tbody>
      </table>
    </div>
          </>
        </div>
        <span className="plusIconStyle">
        <Link to='/horseform'>
        <BsPlusCircleFill style={{
          fontSize:'22px'
        }}/>
        </Link>
        </span>
      </div>
    </div>
    </>
    
  );
};

export default Table;
