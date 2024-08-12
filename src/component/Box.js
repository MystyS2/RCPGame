import React from 'react'

const Box = (props) => {
  return (
    <div className='box'>
        Box1
        <p>{props.name}</p>
    </div>
  )
}

export default Box