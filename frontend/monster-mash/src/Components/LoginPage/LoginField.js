import React from 'react'
const LoginField = function(label, value, onChangeFunction){
  return (
    <div>
      {label}
      <input value={value} onChange={()=> onChangeFunction()}/>
    </div>
  )
}
export default LoginField
