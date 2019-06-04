import React from 'react'
const Button = function(classname, clickFunction, label, labelStyle){
  return (
    <div>
      <button className= {classname} onClick={()=> clickFunction()}>
        <label className= {labelStyle}>
        {label}
        </label>
      </button>
    </div>
  )
}
export default Button
