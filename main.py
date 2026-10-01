from fastapi import FastAPI,UploadFile,HTTPException
from openai import OpenAI
from dotenv import load_dotenv
from pypdf import PdfReader
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import psycopg
import os
from pgvector.psycopg import register_vector
load_dotenv()
conn = psycopg.connect(
      host="localhost",
      port = "5432",
      dbname = "ai-chatbot",
      user = "postgres",
      password = os.getenv("DB_PASSWORD")
       
)
register_vector(conn)
cursor = conn.cursor()





client = OpenAI()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ChatRequest(BaseModel):
      message:str
      filename:str



@app.get("/")
def home():
    return {"message":"ai chatbot app is running"}

@app.post("/chat")
def chat(data:ChatRequest):
    

    
    
    question = data.message
    filename = data.filename
    if not question.strip():
          raise HTTPException(
                status_code=400,
                detail = "Question cannot be empty"
          )

    
    response = client.embeddings.create(
          model ="text-embedding-3-small",
          input=question
    )
    question_embedding = response.data[0].embedding
    cursor.execute(    
    """SELECT chunk
       FROM pdf_chunk
       WHERE filename = %s
       ORDER BY embedding <=> %s::vector
       LIMIT 3 """,
      (filename,question_embedding,)
)
    context = ""
    result = cursor.fetchall()
    print ("result:",result,flush=True)
    for row in result:
          context = context+row[0]+"\n"
    print("CONTEXT:", context)       
        

    prompt = f""" 
    you are a pdf question-answering assistant.
    Answer the user question using only the information provided in the contant below
     context:{context}  
     question:{question}  
     if the answer is not present in the context,say:
     "the answer is not availble in the uploaded pdf"
     """
    response = client.responses.create(
        model = "gpt-5.6-luna",
        input = prompt  
    )
    
   

    answer = response.output_text
          

     
    return{
       "response" :answer
       
    }
@app.post("/upload")
def upload_pdf(file:UploadFile):
    if file.content_type != "application/pdf":
          raise HTTPException(
                status_code=400,
                detail = "Only PDF files are allowed"
          )

    pdf = PdfReader(file.file)
    
    text = ""
    for page in pdf.pages:
       text = text + (page.extract_text() or "")
    words = text.split()
    if not words:
          raise HTTPException(
                status_code=400,
                detail = "No readable text found in PDF"
          )
    
    chunk_size = 25
    overlap = 5
    
    chunk_data = []
    
    for i in range(0,len(words),chunk_size-overlap):
                     
                     chunk =  words[i:i+chunk_size]
                     
                     chunk_text = " ".join(chunk)
                     response = client.embeddings.create(
        model="text-embedding-3-small",
        input=chunk_text
    )
                     embedding = response.data[0].embedding
                     chunk_data.append({
                          "chunk" :chunk_text,
                          "embedding": embedding
                      })
    for item in chunk_data:
        try:
              
              cursor.execute(
                          "INSERT INTO pdf_chunk(filename,chunk, embedding) VALUES(%s, %s,%s)",
                          (file.filename,item["chunk"], item["embedding"])
                      )
              
        except Exception as e:  
              conn.rollback()   
              raise
    conn.commit()
    
    return {
         "Filename":file.filename
                                             
            }                       
              
              
                      
          
   
        

        



    

                      

                
      


          
    
                            
                            

                     




              
          
          





   
    
    
 




        






    


    
    

    