import { toast } from 'sonner';
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { AxiosResponse } from 'axios';

export const errorToast = (error: {response: {data: {detail: string}}} | null) => {
    toast.error(
        <div>
            <div className="text-gray-900 font-bold">Erro</div>
            <div className="text-gray-500">{error?.response?.data?.detail ?? 'Unknown error'}</div>
        </div>, 
        {
            icon: <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        }
    )
}

export const successToast = (response: AxiosResponse) => {
    toast.success(
        <div>
            <div className="text-gray-900 font-bold">Sucesso</div>
            <div className="text-gray-500">{response?.data.message}</div>
        </div>, 
        {
            icon: <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        }
    )
}