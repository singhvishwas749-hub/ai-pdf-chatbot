import React from 'react'

const chatHistory = ({history}) => {
  return (
    <div>
      {history.map((items,index)=>(
          <div key={index}>
        <p>You:{items.user}</p>
        <p>Ai:{items.ai}</p>  
    </div>
      ))}
      </div>
  )
}

export default chatHistory