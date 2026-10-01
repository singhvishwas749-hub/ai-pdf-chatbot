import React from 'react'

const ChatInput = ({message,setMessage,sendMessage}) => {
    
  return (
          <div className="flex gap-2 justify-center">
        <input onChange={(e)=>
          setMessage(e.target.value)
          
        
        } 
        value = {message}
        type="text" placeholder="Ask something..." className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"/>
        <button className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600" onClick={sendMessage}>SEND</button>
        </div>
  )
}


export default ChatInput