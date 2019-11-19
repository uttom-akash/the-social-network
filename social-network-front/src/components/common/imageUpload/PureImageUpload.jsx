import React from 'react'

export default ({onFileChange,clsName})=> {
    return (
            <input
                type="file"
                id={clsName}
                name={clsName}
                onChange={onFileChange}
                style={{display: "none"}}
                multiple
            />
    )
}
