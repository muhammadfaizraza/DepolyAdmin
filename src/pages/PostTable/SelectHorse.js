import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Common/Sidebar";
import { fetchHorse, STATUSES } from "../../redux/getReducer/getHorseSlice";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import Header from "../../Components/Common/Header";
import Select from "react-select";
import '../../Components/CSS/horse.css'
import { add } from "../../redux/postReducer/postRace";


const SelectHorse = ({RaceKind,raceName,Description,DayNTime,Weather,RaceStatus,RaceCourse}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { data: horse, status } = useSelector((state) => state.horse);

  // useEffect(() => {
  //   dispatch(fetchHorse());
  // }, [dispatch]);
  
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [selectedOption3, setSelectedOption3] = useState('');
  const [selectedOption4, setSelectedOption4] = useState('');
  const [selectedOption5, setSelectedOption5] = useState('');
  const [selectedOption6, setSelectedOption6] = useState('');

  // const addTodo = id => {
  //   const newTodos = [...todos, { id }];
  //   setTodos(newTodos);

  // };
  
  
  let horseoptions = horse.map(function (item) {
    return {
      id:item._id,
      value: item.NameEn,
      label: item.NameEn,
      jockeyvalue: item.JockeyData.map((item) => item.Name),
    };
  });
  const [data, setData] = useState({
    selectedOption1 ,selectedOption1
  })
 
  const handlesubmit = async event => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("RaceKind", 'Flat');
    formData.append("raceName", 'Testing');
    formData.append("Description", 'Description');
    formData.append("DayNTime", 'DayNTime');
    formData.append("Weather", 'Weather');
    formData.append("RaceStatus", 'RaceStatus');
    formData.append("RaceCourse", '6348007b244c9900161902ec');
    formData.append("Horses",( selectedOption1.id))
    formData.append("Horses", selectedOption2.id)
    formData.append("Horses", selectedOption3.id)
    formData.append("Horses", selectedOption4.id)
    formData.append("Horses", selectedOption5.id)
    formData.append("Horses", selectedOption6.id)
    dispatch(add(formData));
  }


  if (status === STATUSES.LOADING) {
    return (
      <h2
        style={{
          margin: "100px",
        }}
      >
        Loading....
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
      <Header />
      <div className="page">
        <Sidebar />
        <div className="rightsidedata">
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div className="Header ">
              <h4>Add Horse</h4>
            </div>
            <div className="myselecthorse">
                <div className="myselecthorsedata">
                    <span>Gate #</span>
                    <span>Horse Name</span>
                    <span>Jockey Name</span>
                </div>
            </div>
            <div className="myselectdata">
                <div className="myselectiondata">
                    <span>#1</span>
                    <span>
                    <Select
                        defaultValue={selectedOption1}
                        onChange={setSelectedOption1}
                        options={horseoptions}
                        isClearable={true}
                        isSearchable={true}
                      />
                    </span>
                    <span>{selectedOption1 === '' ? (
                        <p>N/A</p>
                      ) : (
                        <p>{selectedOption1.jockeyvalue[0]}</p>
                      )}</span>
                </div>
                <div className="myselectiondata">
                    <span>#2</span>
                    <span>
                    <Select
                        defaultValue={selectedOption2}
                        onChange={setSelectedOption2}
                        options={horseoptions}
                        isClearable={true}
                        isSearchable={true}
                      />
                    </span>
                    <span>{selectedOption2 === '' ? (
                        <p>N/A</p>
                      ) : (
                        <p>{selectedOption2.jockeyvalue[0]}</p>
                      )}</span>
                </div>
                <div className="myselectiondata">
                    <span>#3</span>
                    <span>
                    <Select
                        defaultValue={selectedOption3}
                        onChange={setSelectedOption3}
                        options={horseoptions}
                        isClearable={true}
                        isSearchable={true}
                      />
                    </span>
                    <span>{selectedOption3 === '' ? (
                        <p>N/A</p>
                      ) : (
                        <p>{selectedOption3.jockeyvalue[0]}</p>
                      )}</span>
                </div>
                <div className="myselectiondata">
                    <span>#4</span>
                    <span>
                    <Select
                        defaultValue={selectedOption4}
                        onChange={setSelectedOption4}
                        options={horseoptions}
                        isClearable={true}
                        isSearchable={true}
                      />
                    </span>
                    <span>{selectedOption4 === '' ? (
                        <p>N/A</p>
                      ) : (
                        <p>{selectedOption4.jockeyvalue[0]}</p>
                      )}</span>
                </div>
                <div className="myselectiondata">
                    <span>#5</span>
                    <span>
                    <Select
                        defaultValue={selectedOption5}
                        onChange={setSelectedOption5}
                        options={horseoptions}
                        isClearable={true}
                        isSearchable={true}
                      />
                    </span>
                    <span>{selectedOption5 === '' ? (
                        <p>N/A</p>
                      ) : (
                        <p>{selectedOption5.jockeyvalue[0]}</p>
                      )}</span>
                </div><div className="myselectiondata">
                    <span>#6</span>
                    <span>
                    <Select
                        defaultValue={selectedOption6}
                        onChange={setSelectedOption6}
                        options={horseoptions}
                        isClearable={true}
                        isSearchable={true}
                      />
                    </span>
                    <span>{selectedOption6 === '' ? (
                        <p>N/A</p>
                      ) : (
                        <p>{selectedOption6.jockeyvalue[0]}</p>
                      )}</span>
                </div>
                <div className="sbmtbtn">
                  <button onClick={handlesubmit}>Save & Publish </button>
                </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};
export default SelectHorse;
