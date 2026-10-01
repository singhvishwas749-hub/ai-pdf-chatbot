import { useState } from "react"
import ChatInput from "./components/chatInput"
import UploadFile from "./components/UploadFile"
import ChatHistory from "./components/chatHistory"

const App = ()=>{
  const [message, setMessage] = useState("")
  const [file, setFile] = useState("")
  const [filename, setFilename] = useState("")
  const [history, setHistory] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [error, setError] = useState("")
  const [uploadMessage, setUploadMessage] = useState("")

  
  const uploadFile = async()=>{
    if (!file){
        setError("Please select a pdf file")
        return
    }
    setUploadLoading(true)
    const formData = new FormData()
    formData.append("file",file)
    
    try{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`,{
      method:"POST",
      body:formData
      
    })
    const result = await response.json()
     setUploadMessage("PDF uploaded successfully:"+result.Filename)
     setFilename(result.Filename)
     setFile("")
  
}
catch{
  setError("PDF upload failed.Please try again.")
}
finally{
     setUploadLoading(false)
  }}
  const sendMessage = async()=>{
    setIsLoading(true)
  const data = JSON.stringify({
  message:message,
  filename:filename
  })
  try{
  const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`,{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    body:data
})
const result = await response.json()

 setMessage("")
 setHistory([
  ...history,
  {
  user:message,
  ai : result.response
  }
 ])}
 catch(error){
  
  setError("Something went wrong.Please try again.")
  
}
finally{
  setIsLoading(false)
}
  }
return(
    
 <div className="min-h-screen bg-[#7b3aec] p-5">
      <img src="/robot-talking.png" alt="ai-chatbot" className="w-24 h-24 mx-auto mb-3" />
      <h1 className="text-3xl font-bold text-center mb-6 text-black">AI PDF chatbot</h1>
      <div>

 <UploadFile
  File={file}
  setFile={setFile}
  uploadFile={uploadFile}
/>
{uploadLoading && <p>Uploading...</p>}
<p>{uploadMessage}</p>
<ChatInput
  message={message}
  setMessage={setMessage}
  sendMessage={sendMessage}/>

{loading && <p>Thinking...</p>}
        
        <ChatHistory history={history} />
        {error && <p>{error}</p>}
 </div>
    </div>
  )
}

export default App       



 

    
    


 

  
  
     
  
  

  
 

 
 
 
  
  
  
 
    
  
        

        
        
        
    
        
        
      