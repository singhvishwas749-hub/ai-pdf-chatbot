import React from 'react'

const UploadFile = ({File,setFile,uploadFile}) => {
  return (
    <div className='flex gap-2 items-start'>
      <input
        type="File"
        className="block w-full text-sm text-gray-600 border border-gray-300 bg-white rounded-lg p-2 mb-4 file:mr-4 file:py-3 file:px-5 file:rounded-lg file:border-0 file:bg-purple-100 file:text-purple-700"
        onChange={(e) => {
          setFile(e.target.files[0])
        }}
      />

      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        onClick={uploadFile}
      >
        Upload
      </button>
    </div>
  )
}


export default UploadFile