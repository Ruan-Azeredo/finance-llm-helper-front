import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { AxiosError, AxiosResponse } from "axios"

const RequestAnswer = ({respData} : {respData: AxiosResponse | AxiosError | null}) => {

    console.log(respData)

    return (
        <div aria-live="assertive" className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
                <div className="flex items-start">
                <div className="flex-shrink-0">
                {respData?.status === 200 ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                ) : (
                    <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                {respData?.status === 200 ? (
                    <p className="text-sm font-medium text-gray-900">Salvo com sussesso!</p>
                ) : (
                    <p className="text-sm font-medium text-gray-900">Ocorreu um erro!</p>
                )}
                    <p className="mt-1 text-sm text-gray-500">{respData?.status === 200 ? respData?.data.message : respData?.response?.data.detail}</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                    <button type="button" className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <span className="sr-only">Close</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

    )
}

export default RequestAnswer