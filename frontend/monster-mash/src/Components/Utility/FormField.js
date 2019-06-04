import React from 'react'
const FormField = function(fieldStyle, labelStyle, label, value, onChangeFunction, inputStyle){
  return (
    <div className= {fieldStyle}>
      <label className= {labelStyle}>
        {label}
      </label>
      <input className={inputStyle} value={value} onChange={(event)=> onChangeFunction(event, label)}/>
    </div>
  )
}
export default FormField
