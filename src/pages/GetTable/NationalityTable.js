import React, { useEffect ,Fragment } from "react";
import { fetchnationality ,STATUSES } from "../../redux/getReducer/getNationality";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { remove } from "../../redux/postReducer/PostJockey";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import swal from 'sweetalert';
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";


import ScrollContainer from "react-indiana-drag-scroll";



const NationalityTable = () => {



    const dispatch = useDispatch();
    const history = useNavigate();
    const { data: nationality, status } = useSelector((state) => state.nationality);
    useEffect(() => {
      dispatch(fetchnationality());
    }, [dispatch]);
    const handleRemove = (Id) => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          dispatch(remove(Id));
          history("/jockey");
        } else {
          swal("Your imaginary file is safe!");
        }
      });
      dispatch(remove(Id));
      history("/nationalitylist");
    };
  
    
    if (status === STATUSES.LOADING) {
      return <Lottie animationData={HorseAnimation} loop={true}  className='Lottie'/>
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
 <Fragment>

<div className="page">
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Header ">
              <h4>Nationality Listings</h4>

              <div>
                <h6
                  style={{
                    marginRight: "100px",
                    alignItems: "center",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  
                </h6>

                <Link to="/nationality">
                  <button>Add Nationality</button>
                </Link>
              </div>
            </div>
            <>
              <div className="div_maintb">
                <ScrollContainer >
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Name Arabic </th>
                      <th>Alternative Name </th>

                      <th>Abbreviation</th>
                      <th>Short Code</th>
                      <th>Label</th>
                      <th>Off Set </th>
                 
                      <th>Value</th>
                  
                    
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nationality.map((item, index) => {
                      return (
                        <>
                          <tr className="tr_table_class">
                            <td>{item.NameEn}</td>
                            <td>{item.NameAr}</td>
<td>{item.AltName}</td>
<td>{item.Abbrev}</td>
<td>{item.shortCode} </td>
<td>{item.Label} </td>
<td>{item.Offset} </td>
<td>{item.Value}</td>

                      

                            <td>
                              <img src={item.image} alt="" />
                            </td>

                            <td className="table_delete_btn1">
                       {/* <Link to={`/editjockey/${item._id}`}> <BiEdit /></Link>  */}
                              <MdDelete
                                style={{
                                  fontSize: "22px",
                                }}
                                // onClick={() => handleRemove(item._id)}
                              />
                         
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>

                </table>
                </ScrollContainer>
              </div>
            </>
          </div>
          <span className="plusIconStyle"></span>
        </div>
      </div>









 </Fragment>


  )
}

export default NationalityTable