import React from 'react'
import './ImageUpload.css'

export default ({onFileChange,btn_id,text})=> {
    return (
        <div className="file-upload">
            <input
                type="file"
                id="uploadfile"
                name="uploadfile"
                onChange={onFileChange}
            />
            <label htmlFor="uploadfile" className="upload-icon" id={btn_id}>
                    <i aria-hidden="true" class="image outline large icon"></i>
                    {text}
            </label>
        </div>
    )
}
