import React, { useEffect } from "react";

import { fetchTrainer, STATUSES } from "../../redux/getReducer/getTrainerSlice";
import { useDispatch, useSelector } from "react-redux";


import { remove } from "../../redux/postReducer/PostTrainer";

import {  useNavigate } from "react-router-dom";


const Statistic = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { data: trainer, status } = useSelector((state) => state.trainer);
  useEffect(() => {
    dispatch(fetchTrainer());
  }, []);
  const handleRemove = (Id) => {
    dispatch(remove(Id));
    history("/trainer");
  };
  if (status === STATUSES.LOADING) {
    return (
      <h2
      className="loader"
      >
       
      </h2>
    );
  }

  if (status === STATUSES.ERROR) {
    return (
      <h2
        style={{
          margin: "100px",
        }}
      >
        Something went wrong!
      </h2>
    );
  }
  return (
   <>

   <div className="page">
 
      <div className="rightsidedata">

      {/* <div className="newtables"></div> */}
        {/* <div
          style={{
            marginTop: "30px",
          }}
        >
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Detail</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {trainer.map((item, index) => {
                  return (
                    <>
                      <tr className="tr_table_class">
                        <td>{index}</td>
                        <td>
                          <img src={item.image} alt="" />
                        </td>
                        <td>{item.Name}</td>
                        <td>{item.Age}</td>
                        <td>{item.Detail}</td>
                        <td>{item.Remarks}</td>
                        <td className="table_delete_btn1">
                          <MdDelete
                            style={{
                              fontSize: "22px",
                            }}
                            onClick={() => handleRemove(item._id)}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </>
        </div> */}
       
      </div>
    </div>
   </>
  );
};
export default Statistic;
