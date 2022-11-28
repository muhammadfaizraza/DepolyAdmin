import React from 'react'


import '../CSS/modal.css'


const SponsorModal = (data) => {



    return (
      <div  >
      <div >
          <h2>Title</h2>

      <p>{data.data.TitleAr}</p>
      </div>
      <div style={{direction:"rtl"}}>
      <h2>عنوان</h2>
          <p>{data.data.TitleAr}</p>
          </div>
          <div >
          <h2>Description</h2>

      <p>{data.data.DescriptionEn}</p>
      </div>  
      <div style={{direction:"rtl"}}>
      <h2>وصف</h2>
          <p>{data.data.DescriptionAr}</p>
          </div>
      <img src={data.data.image} width="50" height='100' alt=""/>
  </div>
  
  
  )
}

export default SponsorModal