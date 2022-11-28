import React from 'react'

const Search = () => {
  return (
    <div className='searchdiv'>
      </div>  
  )
}

export default Search


// import React, { Fragment, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Select from "react-select";
// import { fetchjockey } from "../../redux/getReducer/getJockeySlice";
// import { useSelector, useDispatch } from "react-redux";

// const Search = () => {
//   const dispatch = useDispatch();
//   const { data: jockey } = useSelector((state) => state.jockey);

//   useEffect(() => {
//     dispatch(fetchjockey());
//   }, [dispatch]);

//   let raceoptions = jockey.map(function (item) {
//     return {
//       id: item._id,
//       value: item.Name,
//       label: item.Name,
//     };
//   });
//   const [Race, setRace] = useState("");

  
//   return (
//     <div className="searchdiv">
//       <Select
//         placeholder={<div style={{
//           textAlign:'left'
//         }}>Search Jockey</div>}
//         defaultValue={Race}
//         onChange={setRace}
//         options={raceoptions}
//         isClearable={true}
//         isSearchable={true}
//       />
//     </div>
//   );
// };

// export default Search;
