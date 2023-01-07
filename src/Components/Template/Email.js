import React from 'react'
import ReactQuill,{Quill} from "react-quill";
import ImageResize from 'quill-image-resize-module-react';


Quill.register('modules/imageResize', ImageResize);
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
];
const Email = () => {


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