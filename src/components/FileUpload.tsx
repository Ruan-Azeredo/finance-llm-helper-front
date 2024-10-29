import { useState } from "react"
import axios from "axios";
import { DocumentIcon } from "@heroicons/react/24/outline";
const VITE_APP = import.meta.env.VITE_APP

interface FileUploadProps {
  setTransactions: (data: unknown) => void,
  setAnalyzeReqSended: (data: boolean) => void
}

export default function FileUpload({setTransactions, setAnalyzeReqSended}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  }


  console.log('process', VITE_APP)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    setAnalyzeReqSended(true)
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      if(VITE_APP === 'PROD'){
        
      
        await axios.post("https://inance-llm-helper-financehelperllm6507-kjc5emu8.leapcell.dev/categorize-transaction", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((response) => {
          console.log('resp: ',response);
          setTransactions(response.data.transactions)
        })
      } else {
        await axios.post("http://127.0.0.1:8000/categorize-transaction", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((response) => {
          console.log('resp: ',response);
          setTransactions(response.data.transactions)
        })
      }

    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

    return (
      <form className='col-span-full' onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Extrato Bancário</label>
          <label htmlFor='file-upload' className="cursor-pointer mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              {/* <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
              </svg> */}
              <DocumentIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500">
                  {!selectedFile && (
                    <span>Upload de arquivos</span>
                  )}
                  <input onChange={handleFileChange} id="file-upload" name="file-upload" type="file" className="sr-only"/>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-gray-600">Arquivo selecionado: {selectedFile.name}</p>
                  )}
      
                </label>
              </div>
              {!selectedFile && (
                <p className="text-xs leading-5 text-gray-600">OFX ou CSV</p>
              )}
            </div>
          </label>
        </div>
          <button type="submit" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4">Categorizar Transações</button>
        </form>
    )
}