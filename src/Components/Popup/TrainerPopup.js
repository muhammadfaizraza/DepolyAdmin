import React from 'react'


import '../CSS/modal.css'


const TrainerPopup = (data) => {

    return (
      <div  >
      <div >
          <h2>Name</h2>

      <p>{data.data.Name}</p>
      </div>

          <div >
          <h2>Age</h2>

      <p>{data.data.Age}</p>
      </div>  
      <div >
          <h2>Description</h2>

      <p>{data.data.Detail}</p>
      </div>  
      
      
      <div >
          <h2>Remarks</h2>

      <p>{data.data.Remarks}</p>
      </div>  
      
      <img src={data.data.image} width="50" height='100' alt=""/>
  </div>
  
  
  )
}

export default TrainerPopup;