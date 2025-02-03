import React, { useEffect, useState } from 'react';
import  Navbar  from './Navbar';

const Upload = () => {
    const[saveit,setSaveId]=useState()
    const[miyfile,setFile]=useState()

useEffect(()=>{
    const url=window.location.href
    let url1=url.split("=")
    setSaveId(url1[1])
},[])

const getupload = async () => {
      try {
      const formData = new FormData();
      formData.append('file', miyfile);
      let reqoptions = {
      method: 'POST',
      body:formData
      }
      fetch(`http://localhost:5000/api/upload_image?id=${saveit}`,reqoptions)
      } catch (error) {
      console.error(error);
      }
      }    
      return (
      <div className="bookstore-container">
      <Navbar className="navbar-custom"/>
      <div className='col-md-4'>
      <div className='mb-3'>

      <form >
        
      <div className="form-field">
      <label>Upload file here</label>
      <input type="file" 
      id="myFile" 
      className="myFile" multiple
      onChange={(e)=>setFile(e.target.files[0])}
      />
      </div>

      <div className="form-field">
      <div className='btn btn-success' onClick={()=>getupload()}>Submit</div>
      </div>
      </form>
      </div>
      </div>
      </div>
      );
      }

export default Upload;
