// import React, { useEffect, Fragment,useState } from "react";
// import DeletedAds from "../../Components/DeletedData/DeletedAds";
// import DeletedColor from "../../Components/DeletedData/DeletedColor";
// import DeletedCategory from "../../Components/DeletedData/DeletedCategory";

// import Dropdown from 'react-bootstrap/Dropdown';

// const DeletedTable = () => {
  
//     const [value,setValue]=useState('');
//     const handleSelect=(e)=>{
//       console.log(e);
//       setValue(e)
//     }
//     function Tab(value) {
    
//       if (value.toString() == 'Table2') {
//         return <DeletedAds />;
//       }else if (value.toString()=='Table1') {
//         return <DeletedColor />;
//       }else {
//         return <DeletedCategory />;
//       }
//     }

//   return (
//     <Fragment>
//       <div>
//       <Dropdown  onSelect={handleSelect}>
//         <Dropdown.Toggle variant="success" id="dropdown-basic">
//           Dropdown Button
//         </Dropdown.Toggle>

//         <Dropdown.Menu>
//           <Dropdown.Item eventKey="Table1">1</Dropdown.Item>
//           <Dropdown.Item eventKey="Table2">2</Dropdown.Item>
//           <Dropdown.Item eventKey="Table3">3</Dropdown.Item>
//         </Dropdown.Menu>
//       </Dropdown>
//       <h4>You selected {value}</h4>
//       </div>
//       <Tab value={value} />
//     </Fragment>
//   );
// };

// export default DeletedTable;

import React, { useState } from 'react';
import Table1 from "../../Components/DeletedData/DeletedAds";
import Table2 from "../../Components/DeletedData/DeletedColor";
import Table3 from "../../Components/DeletedData/DeletedCategory";
import Dropdown from 'react-bootstrap/Dropdown';

function App() {
  
  const [value,setValue]=useState('');
  const handleSelect=(e)=>{
    console.log(e);
    setValue(e)
  }
  

  return (
    <div className="app-container">
      <Dropdown  onSelect={handleSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="Table1">1</Dropdown.Item>
          <Dropdown.Item eventKey="Table2">2</Dropdown.Item>
          <Dropdown.Item eventKey="Table3">3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <h4>You selected {value}</h4>
      <Tab value={value} />
    </div>
  );
}

function Tab({value}) {
  
    if (value.toString() == 'Table2') {
      return <Table2 />;
    }else if (value.toString()=='Table1') {
      return <Table1 />;
    }else {
      return <Table3 />;
    }
  }

export default App;