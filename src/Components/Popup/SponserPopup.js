import React from 'react'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import '../CSS/modal.css'


const SponsorModal = (data) => {



    return (
        <div className="form">
             <div className="modalPreview">
           <img src={data.data.image}  className="PreviewImage" alt=""/>
           </div>
            <div className="row mainrow">
      
              <div className="col-sm">

              <FloatingLabel
                  controlId="floatingInput"
                  label="Title"
                  className="mb-3"
               
                >
                  <Form.Control type="text" placeholder="Title" value={data.data.TitleEn} readOnly />
                </FloatingLabel>
             
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
              <FloatingLabel
                  controlId="floatingInput"
                  label="عنوان"
                  className="mb-3 floatingInputAr"
                  style={{ direction: "rtl", left: "initial", right: 0 }}
                
                 
                >
                  <Form.Control type="text" placeholder="Description" value={data.data.TitleAr} style={{ left: "%" }} readOnly />
                </FloatingLabel>
                
              </div>
            </div>

            <div className="row mainrow">
              <div className="col-sm">

              <FloatingLabel
                  controlId="floatingInput"
                  label="Description"
                  className="mb-3"
               
                
                >
                  <Form.Control type="text" placeholder="Description" value={data.data.DescriptionEn} readOnly />
                </FloatingLabel>
             
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
              <FloatingLabel
                  controlId="floatingInput"
                  label="وصف"
                  className="mb-3 floatingInputAr"
                  style={{ direction: "rtl", left: "initial", right: 0 }}
                
                 
                >
                  <Form.Control type="text" placeholder="وصف"  value={data.data.DescriptionAr} style={{ left: "%" }}  readOnly/>
                </FloatingLabel>
                
              </div>
            </div>
            <div className="row mainrow">
              <div className="col-sm">
              <FloatingLabel
                  controlId="floatingInput"
                  label="URL"
                  className="mb-3"
               
                >
                  <Form.Control type="text" placeholder="Url"  value={data.data.Url} readOnly/>
                </FloatingLabel>
             
                                
              </div>
            </div>
            
         
            
           
            

   
            
        
          {/* <form onSubmit={submit}>
            <div className="row mainrow">
              <div className="col-sm">
              <input
                                    type='text'
                                    name='TitleEn'
                                    id='TitleEn'
                                    className='group__control'
                                    placeholder='Name'
                                    value={state1.TitleEn}
                                    onChange={(e) =>
                                        setState({ ...state1, TitleEn: e.target.value })
                                    }
                                />
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
                <input
                  style={{ direction: "rtl" }}
                  placeholder="اسم "
                  type='text'
                                    name='TitleAr'
                                    id='TitleAr'
                                    className='group__control'
                                    value={state1.TitleAr}
                                    onChange={(e) =>
                                        setState({ ...state1, TitleAr: e.target.value })
                                    }
                ></input>
              </div>
            </div>

            <div className="row mainrow">
              <div className="col-sm">
              <input
                                    type='text'
                                    name='TitleEn'
                                    id='TitleEn'
                                    className='group__control'
                                    placeholder='Description'
                                    value={state1.DescriptionEn}
                                    onChange={(e) =>
                                        setState({ ...state1, DescriptionEn: e.target.value })
                                    }
                                />
                <span className="spanForm"> |</span>
              </div>

              <div className="col-sm">
                <input
                  style={{ direction: "rtl" }}
                  placeholder="اسم "
                  type='text'
                                    name='TitleAr'
                                    id='TitleAr'
                                    className='group__control'
                                    value={state1.DescriptionAr}
                                    onChange={(e) =>
                                        setState({ ...state1, DescriptionAr: e.target.value })
                                    }
                ></input>
              </div>
            </div>
            

            <div className="ButtonSection">
              <input type="file" size="60" onChange={fileSelected} />
              <button type="submit" className="SubmitButton">
              Update
              </button>
            </div>
          </form> */}
        </div>
  
  
  )
}

export default SponsorModal