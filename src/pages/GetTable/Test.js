// import { Button, Card, Form } from 'react-bootstrap';
// import React, { useEffect, useState } from "react";
// import Sidebar from "../../Components/Common/Sidebar";
// import { fetchHorse, STATUSES } from "../../redux/getReducer/getHorseSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { remove } from "../../redux/postReducer/PostJockey";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../../Components/Common/Header";
// import Select from "react-select";
// import '../../Components/CSS/horse.css';


// function FormTodo({ addTodo }) {
//   const [value, setValue] = React.useState("");

//   const handleSubmit = e => {
//     e.preventDefault();
//     addTodo(value);
//     setValue("");
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Button variant="primary mb-3" type="submit">
//         Add Another
//       </Button>
//     </Form>
//   );
// }

// function App() {
//   const dispatch = useDispatch();
//   const history = useNavigate();
//   const { data: horse, status } = useSelector((state) => state.horse);

//   useEffect(() => {
//     dispatch(fetchHorse());
//   }, [dispatch]);

//   let horseoptions = horse.map(function (item) {
//     return {
//       id: item._id,
//       value: item.NameEn,
//       label: item.NameEn,
//       jockeyvalue: item.JockeyData.map((item) => item.Name),
//     };
//   });

//   const [selectedOption1, setSelectedOption1] = useState(null);

//   const [todos, setTodos] = useState([
//     {
//       id: "1"
//     },
//     {
//       id: "2"
//     }
//   ]);

//   


(horseoptions, 'sadas');
//   const addTodo = id => {
//     const newTodos = [...todos, { id }];
//     setTodos(newTodos);

//   };

//   const handleHorse = () => {
//     const formdata = new FormData();
//     for (let i = 0; i < 8; i++) {

//       formdata.append(`setSelectedOption1${i}`, selectedOption1);
//     }
//     


(formdata);
//   };
//   return (
//     <div className="app">
//       <div className="container">
//         <h1 className="text-center mb-4">Add horse</h1>

//         <div>
//           <div className="myselecthorsedata">
//             <span>Gate #</span>
//             <span>Horse Name</span>
//             <span>Jockey Name</span>
//           </div>
//           {todos.map((todo, index) => (
//             <>
//               <div className="myselectiondata">
//                 <span># {index}</span>
//                 <span>
//                   <Select
//                     defaultValue={selectedOption1}
//                     onChange={setSelectedOption1}
//                     options={horseoptions}
//                     isClearable={true}
//                     isSearchable={true}
//                     name={`setSelectedOption1${index}`}

//                   />
//                 </span>
//                 <span>{selectedOption1 === null ? (
//                   <p>N/A</p>
//                 ) : (
//                   <p>{selectedOption1.jockeyvalue[0]}</p>
//                 )}</span>
//               </div>
//             </>
//           ))}
//         </div>
//         <FormTodo addTodo={addTodo} />
//         <button onClick={handleHorse}>Submit</button>
//       </div>
//     </div>
//   );
// }

// export default App;




// import React,{useState} from 'react'
// import Select from 'react-select'

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]
// const Test = () => {
//   const [selectedOption2, setSelectedOption2] = useState([]);

//   


(selectedOption2)
//   return (
//     <div>
//       <Select options={options} 
//       isMulti
//       defaultValue={selectedOption2}
//       onChange={setSelectedOption2}
//       className="basic-multi-select"
//       classNamePrefix="select"
//       />
//     </div>
//   )
// }

// export default Test


