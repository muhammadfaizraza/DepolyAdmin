import React, { useEffect ,Fragment } from "react";
import { fetchHorseKind , STATUSES } from "../../redux/getReducer/getHorseKind";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link ,useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import ScrollContainer from "react-indiana-drag-scroll";
import Lottie from "lottie-react";
import HorseAnimation from "../../assets/horselottie.json";
import axios from "axios";
import {BiEdit} from 'react-icons/bi'

const HorseKind = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const { data: HorseKind, status } = useSelector((state) => state.HorseKind);
    useEffect(() => {
      dispatch(fetchHorseKind());
    }, [dispatch]);
    const handleRemove = async (Id) => {
      try {
        const res = await axios.delete(`${window.env.API_URL}/softdeleteHorseKind/${Id}`)
        swal({
          title: "Success!",
          text: "Data has been Deleted successfully ",
          icon: "success",
          button: "OK",
        });
        dispatch(fetchHorseKind());
      } catch (error) {
        const err = error.response.data.message;
        swal({
          title: "Error!",
          text: err,
          icon: "error",
          button: "OK",
        });
      }
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
                  <h4>Horse Kind Listings</h4>
    
                  <div>
                    <h6
                      style={{
                          alignItems: "center",
                          marginRight: "100px",
                        color: "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      
                    </h6>
    
                    <Link to="/horsekindform">
                      <button>Add Horse Kind</button>
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
                        
                          <th>Short Name</th>
                 
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {HorseKind.map((item, index) => {
                          return (
                            <>
                              <tr className="tr_table_class">
                                <td>{item.NameEn}</td>
                                <td>{item.NameAr}</td>
    
    <td>{item.shortName} </td>
  
    
    
                          
    
    <td className="table_delete_btn1">

<BiEdit onClick={() => history('/edithorsekind',{
    state:{
      horseid:item
    }
  })} />

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

export default HorseKind