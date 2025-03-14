import { useState } from "react"
import axios from "axios";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { Transaction } from "../schemas/Transaction";
const VITE_APP = import.meta.env.VITE_APP

interface FileUploadProps {
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
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
        
      
        await axios.post("https://inance-llm-helper-financehelperllm6507-kjc5emu8.leapcell.dev/categorize-transaction/by-file", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((response) => {
          console.log('resp: ',response);
          setTransactions(response.data.transactions)
        })
      } else {
        await axios.post("http://127.0.0.1:8000/categorize-transaction/by-file", formData, {
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
      <form className='w-fit flex justify-center rounded-md border border-gray-900/25' onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor='file-upload' className="cursor-pointer mt-2">
            <div className="text-center h-full">
              {/* <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
              </svg> */}
              {/* <DocumentIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
              <div className="flex h-full py-2.5 text-sm rounded-md leading-6 text-gray-600 hover:bg-gray-50">
                <label htmlFor="file-upload" className="py-auto flex px-2.5 relative cursor-pointer ring-gray-300 rounded-md font-semibold text-sm">
                  {!selectedFile && (
                    <span className="align-middle flex gap-2"> <DocumentIcon className="h-5 w-5"/> Upload de arquivo</span>
                  )}
                  <input onChange={handleFileChange} id="file-upload" name="file-upload" type="file" className="sr-only"/>
                  {selectedFile && (
                    <p className="flex gap-2 text-sm font-normal text-gray-600"><DocumentIcon className="h-5 w-5"/>{selectedFile.name}</p>
                  )}
      
                </label>
              </div>
              {/* {!selectedFile && (
                <p className="text-xs leading-5 text-gray-600">OFX ou CSV</p>
              )} */}
            </div>
          </label>
        </div>
          <button disabled={!selectedFile} type="submit" className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed">Categorizar Transações</button>
        </form>
    )
}