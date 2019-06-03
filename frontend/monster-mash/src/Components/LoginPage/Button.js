import React from 'react'
const Button = function(id, clickFunction, label){
  return (
    <div>
      <button id= {id} onClick={()=> clickFunction()}>
      {label}
      </button>
    </div>
  )
}
export default Button
