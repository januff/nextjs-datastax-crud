import React, { useState, useEffect, useDebugValue } from 'react';
import { useUpload } from '../db/datastax' 

function Upload() {

  const [file, setFile] = useState(null)
  const [imgURL, setURL] = useState(null)
  const [imgBlob, setBlob] = useState(null)
  const [imgBase, setBase] = useState(null)

  const [upload, uploadInfo] = useUpload()
  

  const chooseFile = (e) => {
    e.preventDefault
    setURL(window.URL.createObjectURL(e.target.files[0]))
    let reader = new FileReader()
    setFile(e.target.files[0])
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onloadend = function(){
      setBlob(reader.result)
    }

    // const reader = new FileReader()
    // if (file) {
    //   reader.readAsDataURL(file);
    // }
    // setURL(reader.result)
  }

  const uploadFile = (e) => {
    e.preventDefault
    const imgElement = document.getElementsByTagName('img');
    console.log('width: ', imgElement[0].naturalWidth);
    console.log('height: ', imgElement[0].naturalHeight);
    let base = Buffer.from(imgBlob).toString('base64')
    setBase(base)
    let fileObj = {
      name: file.name,
      base64: base
    }
    // console.log(JSON.stringify(fileObj))
    upload(fileObj)
  }

  return (
    <section>
      <div className="file-input">
        <input 
          id="file"
          onChange={chooseFile} type="file" className="file" />
        <label htmlFor="file">
          Select file
        <p className="file-name"></p>
        </label>
      </div>
      {imgURL &&
        <div className="preview">
            <img src={imgURL}/>
        </div>
      }
      {file && 
        <button onClick={uploadFile}>
            Upload
        </button>
      }
    </section>
  )
}

export default Upload