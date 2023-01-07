import React from 'react'
import ReactQuill from "react-quill";



const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ direction: "rtl" }], // this is rtl support
    ],
    handlers:{
       "image":()=>this.quillImageCallback()
    }
  };
  
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  
  

const Email = () => {

const filecompress =()=>{
return 


}

  const  quillImageCallback = ()=>{

const input = document.createElement('input')
input.setAttribute("file")
input.click()
const file = input.files[0]
input.onchange = async ()=>{
    const copressState = await filecompress(file)
}
    }
    return (
    <div className='parentTemplate'>
        <div className="Headers">Compose Email</div>
<div className='templateInputs'>
<input placeholder='To' type="text"/>

</div>
<div className='templateInputs'>
<input placeholder='Subject' type="text"/>

</div>
    <div className="row">
    <div className="col-sm">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}

/>

    </div>
 
  </div>
  <div className="ButtonSection " style={{ justifyContent: "end" ,marginRight:"65px"}}>
                <button Name="submit" className="SubmitButton" >
                Submit
                </button>
                </div>
  </div>
  )
}

export default Email